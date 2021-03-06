/*
  SystemJS Loader Plugin Support

  Supports plugin loader syntax with "!", or via metadata.loader

  The plugin name is loaded as a module itself, and can override standard loader hooks
  for the plugin resource. See the plugin section of the systemjs readme.
*/
(function() {
  hook('normalize', function(normalize) {
    // plugin syntax normalization
    return function(name, parentName, parentAddress) {
      var loader = this;
      // if parent is a plugin, normalize against the parent plugin argument only
      var parentPluginIndex;
      if (parentName && (parentPluginIndex = parentName.indexOf('!')) != -1)
        parentName = parentName.substr(0, parentPluginIndex);

      return Promise.resolve(normalize.call(loader, name, parentName, parentAddress))
      .then(function(name) {
        // if this is a plugin, normalize the plugin name and the argument
        var pluginIndex = name.lastIndexOf('!');
        if (pluginIndex != -1) {
          var argumentName = name.substr(0, pluginIndex);

          // plugin name is part after "!" or the extension itself
          var pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);

          // normalize the plugin name relative to the same parent
          return new Promise(function(resolve) {
            resolve(loader.normalize(pluginName, parentName, parentAddress)); 
          })
          // normalize the plugin argument
          .then(function(_pluginName) {
            pluginName = _pluginName;
            return loader.normalize(argumentName, parentName, parentAddress);
          })
          .then(function(argumentName) {
            return argumentName + '!' + pluginName;
          });
        }

        // standard normalization
        return name;
      });
    };
  });

  hook('locate', function(locate) {
    return function(load) {
      var loader = this;

      var name = load.name;

      // only fetch the plugin itself if this name isn't defined
      if (loader.defined && loader.defined[name])
        return locate.call(loader, load);

      var pluginSyntaxIndex = name.lastIndexOf('!');
      var plugin = load.metadata.loader;

      // plugin syntax
      if (pluginSyntaxIndex != -1) {
        plugin = name.substr(pluginSyntaxIndex + 1);
        name = name.substr(0, pluginSyntaxIndex);
      }

      if (plugin) {
        var pluginLoader = loader.pluginLoader || loader;

        // load the plugin module
        return pluginLoader.load(plugin)
        .then(function() {
          var loaderModule = pluginLoader.get(plugin);

          // store the plugin module itself on the metadata
          load.metadata.loaderModule = loaderModule;
          load.metadata.loaderArgument = name;
          load.metadata.loader = plugin;

          // run plugin locate if given, with name with syntax removed
          var argLoad = {
            name: name,
            address: load.address,
            metadata: { loader: false }
          };
          for (var p in load.metadata) {
            if (p.substr(0, 6) !== 'loader')
              argLoad.metadata[p] = load.metadata[p];
          }
          if (loaderModule.locate)
            return loaderModule.locate.call(loader, argLoad);
          else
            return Promise.resolve(loader.locate(argLoad))
            .then(function(address) {
              // backwards compat for strange plugin * paths
              if (loader.paths['*'] == '*.js')
                return address.replace(/\.js$/, '');
              return address;
            });
        });
      }

      return locate.call(loader, load);
    };
  });

  hook('fetch', function(fetch) {
    return function(load) {
      var loader = this;
      if (load.metadata.loaderModule && load.metadata.loaderModule.fetch) {
        load.metadata.scriptLoad = false;
        return load.metadata.loaderModule.fetch.call(loader, load, fetch);
      }
      else {
        return fetch.call(loader, load);
      }
    };
  });

  hook('translate', function(translate) {
    return function(load) {
      var loader = this;
      if (load.metadata.loaderModule && load.metadata.loaderModule.translate)
        return Promise.resolve(load.metadata.loaderModule.translate.call(loader, load)).then(function(result) {
          if (typeof result == 'string')
            load.source = result;
          return translate.call(loader, load);
        });
      else
        return translate.call(loader, load);
    };
  });

  hook('instantiate', function(instantiate) {
    return function(load) {
      var loader = this;
      if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate)
        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load)).then(function(result) {
          load.metadata.format = 'defined';
          load.metadata.execute = function() {
            return result;
          };
          return instantiate.call(loader, load);
        });
      else
        return instantiate.call(loader, load);
    };
  });

})();
