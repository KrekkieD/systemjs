/*
 * Package Configuration Extension
 *
 * Creates new `System.packages` configuration function.
 * Which in turn populates base-level configs.
 * Also adds support for package mains.
 *
 * Example:
 *
 * System.packages = {
 *   jquery: {
 *     main: 'index.js', // this main is actually set by default
 *     format: 'amd',
 *     defaultExtension: 'js',
 *     meta: {
 *       '*.ts': {
 *         loader: 'typescript'
 *       },
 *       'vendor/sizzle.js': {
 *         format: 'global'
 *       }
 *     },
 *     map: {
 *        // map internal require('sizzle') to local require('./vendor/sizzle')
 *        sizzle: './vendor/sizzle.js',
 *
 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
 *        './vendor/another': 'another/index.js'
 *      }
 *    }
 *  }
 * };
 *
 * Then:
 *   import 'jquery'                -> jquery/index.js
 *   import 'jquery/submodule'      -> jquery/submodule.js
 *   import 'jquery/vendor/another' -> jquery/another/index.js
 *
 * In addition, the following meta properties will be allowed to be package
 * -relative as well in the package meta config:
 *   
 *   - loader
 *   - alias
 *
 */
(function() {

  hookConstructor(function(constructor) {
    return function() {
      constructor.call(this);
      this.packages = {};
    };
  });

  function getPackage(name) {
    for (var p in this.packages) {
      if (name.substr(0, p.length) === p && (name.length === p.length || name[p.length] === '/'))
        return p;
    }
  }

  function applyMap(map, name) {
    var bestMatch, bestMatchLength = 0;
    
    for (var p in map) {
      if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
        var curMatchLength = p.split('/').length;
        if (curMatchLength <= bestMatchLength)
          continue;
        bestMatch = p;
        bestMatchLength = curMatchLength;
      }
    }
    if (bestMatch)
      name = map[bestMatch] + name.substr(bestMatch.length);

    return name;
  }

  hook('normalize', function(normalize) {
    return function(name, parentName, parentAddress) {
      // apply contextual package map first
      if (parentName)
        var parentPackage = getPackage.call(this, parentName);

      if (parentPackage && name[0] !== '.') {
        var parentMap = this.packages[parentPackage].map;
        if (parentMap) {
          name = applyMap(parentMap, name);

          // relative maps are package-relative
          if (name[0] === '.')
            parentName = parentPackage;
        }
      }

      // apply global map, relative normalization
      var normalized = normalize.call(this, name, parentName, parentAddress);

      // check if we are inside a package
      var pkgName = getPackage.call(this, normalized);

      if (pkgName) {
        var pkg = this.packages[pkgName];

        // main
        if (pkgName === normalized && pkg.main)
          normalized += '/' + pkg.main;

        // relative maps
        if (pkg.map) {
          normalized = pkgName + applyMap(pkg.map, '.' + normalized.substr(pkgName.length)).substr(1);

          // normalize package-relative maps
          if (normalized.substr(0, 2) == './')
            normalized = pkgName + normalized.substr(1);
        }

        // defaultExtension
        if (pkg.defaultExtension 
            && (!pkg.meta || !pkg.meta[normalized.substr(pkgName.length + 1)])
            && normalized.split('/').pop().indexOf('.') == -1)
          normalized += '.' + pkg.defaultExtension;
      }

      return normalized;
    };
  });

  // we now have the complete normalize algorithm
  // this is also the last point normalize is sync
  SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.normalize;

  hook('locate', function(locate) {
    return function(load) {
      var loader = this;
      return Promise.resolve(locate.call(this, load))
      .then(function(address) {
        var pkgName = getPackage.call(loader, load.name);
        if (pkgName) {
          var pkg = loader.packages[pkgName];
          
          // format
          if (pkg.format)
            load.metadata.format = load.metadata.format || pkg.format;

          // loader
          if (pkg.loader)
            load.metadata.loader = load.metadata.loader || pkg.loader;

          if (pkg.meta) {
            // wildcard meta
            var meta = {};
            var bestDepth = 0;
            var wildcardIndex;
            for (var module in pkg.meta) {
              wildcardIndex = indexOf.call(module, '*');
              if (wildcardIndex === -1)
                continue;
              if (module.substr(0, wildcardIndex) === load.name.substr(0, wildcardIndex)
                  && module.substr(wildcardIndex + 1) === load.name.substr(load.name.length - module.length + wildcardIndex + 1)) {
                var depth = module.split('/').length;
                if (depth > bestDepth)
                  bestDetph = depth;
                extend(meta, pkg.meta[module], bestDepth != depth);
              }
            }
            // exact meta
            if (pkg.meta[load.name])
              extend(meta, meta[load.name]);

            // allow alias and loader to be package-relative
            if (meta.alias && meta.alias.substr(0, 2) == './')
              meta.alias = pkgName + meta.alias.substr(1);
            if (meta.loader && meta.loader.substr(0, 2) == './')
              meta.loader = pkgName + meta.alias.substr(1);
            
            extend(load.metadata, meta);
          }
        }

        return address;
      });
    };
  });

})();