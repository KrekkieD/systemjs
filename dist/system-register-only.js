/*
 * SystemJS v0.16.11
 */
!function(e){function t(e,t){var n;if(e instanceof Error){var n=new Error(e.message,e.fileName,e.lineNumber);n.message=e.message+"\n	"+t,n.stack=e.stack}else n=e+"\n	"+t;return n}function n(e,n,r){try{new Function(e).call(r)}catch(a){throw t(a,"Evaluating "+n)}}function r(){}function a(){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},v(this,"global",{get:function(){return e}})}function o(e){a.call(this),e=e||g,this.baseURL=e,this.paths={}}function d(){}function s(e){o.call(this,e),x.call(this,e)}function i(){}function l(e,t){s.prototype[e]=t(s.prototype[e])}function u(e){x=e(x||function(){})}function c(e){for(var t=[],n=0,r=e.length;r>n;n++)-1==h.call(t,e[n])&&t.push(e[n]);return t}var f="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,m="undefined"!=typeof window&&"undefined"!=typeof document,p="undefined"!=typeof process&&!!process.platform.match(/^win/);e.console&&(console.assert=console.assert||function(){});var v,h=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(v=Object.defineProperty)}catch(e){v=function(e,t,n){try{e[t]=n.value||n.get.call(e)}catch(r){}}}}();{var g;e.URL||URLPolyfill}if("undefined"!=typeof document&&document.getElementsByTagName){if(g=document.baseURI,!g){var y=document.getElementsByTagName("base");g=y[0]&&y[0].href||window.location.href}g=g.split("#")[0].split("?")[0],g=g.substr(0,g.lastIndexOf("/")+1)}else if("undefined"!=typeof process&&process.cwd)g="file://"+(p?"/":"")+process.cwd()+"/",p&&(g=g.replace(/\\/g,"/"));else{if("undefined"==typeof location)throw new TypeError("No environment baseURI");g=e.location.href}!function(){function o(e){return{status:"loading",name:e,linkSets:[],dependencies:[],metadata:{}}}function d(e,t,n){return new Promise(c({step:n.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:n&&n.metadata||{},moduleSource:n.source,moduleAddress:n.address}))}function s(e,t,n,r){return new Promise(function(a){a(e.loaderObj.normalize(t,n,r))}).then(function(t){var n;if(e.modules[t])return n=o(t),n.status="linked",n.module=e.modules[t],n;for(var r=0,a=e.loads.length;a>r;r++)if(n=e.loads[r],n.name==t)return n;return n=o(t),e.loads.push(n),i(e,n),n})}function i(e,t){l(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function l(e,t,n){u(e,t,n.then(function(n){return"loading"==t.status?(t.address=n,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:n})):void 0}))}function u(t,r,a){a.then(function(a){return"loading"==r.status?Promise.resolve(t.loaderObj.translate({name:r.name,metadata:r.metadata,address:r.address,source:a})).then(function(e){return r.source=e,t.loaderObj.instantiate({name:r.name,metadata:r.metadata,address:r.address,source:e})}).then(function(a){if(void 0===a)return r.address=r.address||"<Anonymous Module "+ ++k+">",r.isDeclarative=!0,transpile.call(t.loaderObj,r).then(function(t){var a=e.System,o=a.register;a.register=function(e,t,n){"string"!=typeof e&&(n=t,t=e),r.declare=n,r.depsList=t},n(t,r.address,{}),a.register=o});if("object"!=typeof a)throw TypeError("Invalid instantiate return value");r.depsList=a.deps||[],r.execute=a.execute,r.isDeclarative=!1}).then(function(){r.dependencies=[];for(var e=r.depsList,n=[],a=0,o=e.length;o>a;a++)(function(e,a){n.push(s(t,e,r.name,r.address).then(function(t){if(r.dependencies[a]={key:e,value:t.name},"linked"!=t.status)for(var n=r.linkSets.concat([]),o=0,d=n.length;d>o;o++)m(n[o],t)}))})(e[a],a);return Promise.all(n)}).then(function(){r.status="loaded";for(var e=r.linkSets.concat([]),t=0,n=e.length;n>t;t++)g(e[t],r)}):void 0})["catch"](function(e){r.status="failed",r.exception=e;for(var t=r.linkSets.concat([]),n=0,a=t.length;a>n;n++)y(t[n],r,e)})}function c(e){return function(t){var n=e.loader,r=e.moduleName,a=e.step;if(n.modules[r])throw new TypeError('"'+r+'" already exists in the module table');for(var d,s=0,c=n.loads.length;c>s;s++)if(n.loads[s].name==r)return d=n.loads[s],"translate"!=a||d.source||(d.address=e.moduleAddress,u(n,d,Promise.resolve(e.moduleSource))),d.linkSets[0].done.then(function(){t(d)});var m=o(r);m.metadata=e.moduleMetadata;var p=f(n,m);n.loads.push(m),t(p.done),"locate"==a?i(n,m):"fetch"==a?l(n,m,Promise.resolve(e.moduleAddress)):(m.address=e.moduleAddress,u(n,m,Promise.resolve(e.moduleSource)))}}function f(e,t){var n={loader:e,loads:[],startingLoad:t,loadingCount:0};return n.done=new Promise(function(e,t){n.resolve=e,n.reject=t}),m(n,t),n}function m(e,t){for(var n=0,r=e.loads.length;r>n;n++)if(e.loads[n]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,n=0,r=t.dependencies.length;r>n;n++){var o=t.dependencies[n].value;if(!a.modules[o])for(var d=0,s=a.loads.length;s>d;d++)if(a.loads[d].name==o){m(e,a.loads[d]);break}}}function p(e){var t=!1;try{S(e,function(n,r){y(e,n,r),t=!0})}catch(n){y(e,null,n),t=!0}return t}function g(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var n=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var r=[].concat(e.loads),a=0,o=r.length;o>a;a++){var t=r[a];t.module=t.isDeclarative?{name:t.name,module:j({}),evaluated:!0}:{module:j({})},t.status="linked",w(e.loader,t)}return e.resolve(n)}var d=p(e);d||e.resolve(n)}}function y(e,n,r){var a=e.loader;n?(n&&e.loads[0].name!=n.name&&(r=t(r,'Error loading "'+n.name+'" from "'+e.loads[0].name+'" at '+(e.loads[0].address||"<unknown>"))),n&&(r=t(r,'Error loading "'+n.name+'" at '+(n.address||"<unknown>")))):r=t(r,'Error linking "'+e.loads[0].name+'" at '+(e.loads[0].address||"<unknown>"));for(var o=e.loads.concat([]),d=0,s=o.length;s>d;d++){var n=o[d];a.loaderObj.failed=a.loaderObj.failed||[],-1==h.call(a.loaderObj.failed,n)&&a.loaderObj.failed.push(n);var i=h.call(n.linkSets,e);if(n.linkSets.splice(i,1),0==n.linkSets.length){var l=h.call(e.loader.loads,n);-1!=l&&e.loader.loads.splice(l,1)}}e.reject(r)}function w(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var n={};t.dependencies.forEach(function(e){n[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:n,address:t.address,metadata:t.metadata,source:t.source,kind:t.isDeclarative?"declarative":"dynamic"}}t.name&&(e.modules[t.name]=t.module);var r=h.call(e.loads,t);-1!=r&&e.loads.splice(r,1);for(var a=0,o=t.linkSets.length;o>a;a++)r=h.call(t.linkSets[a].loads,t),-1!=r&&t.linkSets[a].loads.splice(r,1);t.linkSets.splice(0,t.linkSets.length)}function x(e,t,n){try{var a=t.execute()}catch(o){return void n(t,o)}return a&&a instanceof r?a:void n(t,new TypeError("Execution must define a Module instance"))}function b(e,t,n){var r=e._loader.importPromises;return r[t]=n.then(function(e){return r[t]=void 0,e},function(e){throw r[t]=void 0,e})}function S(e,t){var n=e.loader;if(e.loads.length)for(var r=e.loads.concat([]),a=0;a<r.length;a++){var o=r[a],d=x(e,o,t);if(!d)return;o.module={name:o.name,module:d},o.status="linked",w(n,o)}}function E(e,t){return t.module.module}function P(){}var k=0;a.prototype={constructor:a,define:function(e,t,n){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return b(this,e,new Promise(c({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:n&&n.metadata||{},moduleSource:t,moduleAddress:n&&n.address})))},"delete":function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],t.modules[e]?delete t.modules[e]:!1},get:function(e){return this._loader.modules[e]?(P(this._loader.modules[e],[],this),this._loader.modules[e].module):void 0},has:function(e){return!!this._loader.modules[e]},"import":function(e,t){"object"==typeof t&&(t=t.name);var n=this;return Promise.resolve(n.normalize(e,t)).then(function(e){var t=n._loader;return t.modules[e]?(P(t.modules[e],[],t._loader),t.modules[e].module):t.importPromises[e]||b(n,e,d(t,e,{}).then(function(n){return delete t.importPromises[e],E(t,n)}))})},load:function(e){return this._loader.modules[e]?(P(this._loader.modules[e],[],this._loader),Promise.resolve(this._loader.modules[e].module)):this._loader.importPromises[e]||b(this,e,d(this._loader,e,{}))},module:function(e,t){var n=o();n.address=t&&t.address;var r=f(this._loader,n),a=Promise.resolve(e),d=this._loader,s=r.done.then(function(){return E(d,n)});return u(d,n,a),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t,n=new r;if(Object.getOwnPropertyNames&&null!=e)t=Object.getOwnPropertyNames(e);else{t=[];for(var a in e)t.push(a)}for(var o=0;o<t.length;o++)(function(t){v(n,t,{configurable:!1,enumerable:!0,get:function(){return e[t]}})})(t[o]);return Object.preventExtensions&&Object.preventExtensions(n),n},set:function(e,t){if(!(t instanceof r))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e){return e},locate:function(e){return e.name},fetch:function(){},translate:function(e){return e.source},instantiate:function(){}};var j=a.prototype.newModule}();var w;d.prototype=a.prototype,o.prototype=new d,i.prototype=o.prototype,s.prototype=new i;var x;!function(){function t(e,t){return new Promise(function(n,r){try{importScripts(t.address)}catch(a){r(a)}e.onScriptLoad(t),t.metadata.registered||r(t.address+" did not call System.register or AMD define"),n("")})}if("undefined"!=typeof document)var n=document.getElementsByTagName("head")[0];var r;s.prototype.onScriptLoad=function(){e.System=r},l("fetch",function(a){return function(o){var d=this;return o.metadata.scriptLoad&&(m||f)?f?t(d,o):new Promise(function(t,a){function s(){u.readyState&&"loaded"!=u.readyState&&"complete"!=u.readyState||(l(),d.onScriptLoad(o),o.metadata.registered||a(o.address+" did not call System.register or AMD define"),t(""))}function i(){l(),a(new Error("Unable to load script "+o.address))}function l(){u.detachEvent?u.detachEvent("onreadystatechange",s):(u.removeEventListener("load",s,!1),u.removeEventListener("error",i,!1)),n.removeChild(u)}var u=document.createElement("script");u.async=!0,u.attachEvent?u.attachEvent("onreadystatechange",s):(u.addEventListener("load",s,!1),u.addEventListener("error",i,!1)),r=e.System,e.System=d,u.src=o.address,n.appendChild(u)}):a.call(this,o)}})}(),l("fetch",function(e){return function(t){return t.metadata.scriptLoad=!0,e.call(this,t)}}),function(){function t(e,t,n){if(p=!0,t)n.name=t,t in e.defined||(e.defined[t]=n);else if(n.declarative){if(m)throw new TypeError("Multiple anonymous System.register calls in the same module file.");m=n}}function n(e,t,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==h.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;o>a;a++){var d=e.normalizedDeps[a],s=t.defined[d];if(s&&!s.evaluated){var i=e.groupIndex+(s.declarative!=e.declarative);if(void 0===s.groupIndex||s.groupIndex<i){if(void 0!==s.groupIndex&&(r[s.groupIndex].splice(h.call(r[s.groupIndex],s),1),0==r[s.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");s.groupIndex=i}n(s,t,r)}}}}function r(e,t){var r=t.defined[e];if(!r.module){r.groupIndex=0;var a=[];n(r,t,a);for(var d=!!r.declarative==a.length%2,s=a.length-1;s>=0;s--){for(var l=a[s],u=0;u<l.length;u++){var c=l[u];d?o(c,t):i(c,t)}d=!d}}}function a(e){return v[e]||(v[e]={name:e,dependencies:[],exports:{},importers:[]})}function o(t,n){if(!t.module){var r=t.module=a(t.name),d=t.module.exports,s=t.declare.call(e,function(e,t){r.locked=!0,d[e]=t;for(var n=0,a=r.importers.length;a>n;n++){var o=r.importers[n];if(!o.locked){var s=h.call(o.dependencies,r);o.setters[s](d)}}return r.locked=!1,t});if(r.setters=s.setters,r.execute=s.execute,!r.setters||!r.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var i=0,l=t.normalizedDeps.length;l>i;i++){var u,c=t.normalizedDeps[i],f=n.defined[c],m=v[c];m?u=m.exports:f&&!f.declarative?u=f.esModule:f?(o(f,n),m=f.module,u=m.exports):u=n.get(c),m&&m.importers?(m.importers.push(r),r.dependencies.push(m)):r.dependencies.push(null),r.setters[i]&&r.setters[i](u)}}}function d(e,t){var n,r=t.defined[e];if(r)r.declarative?f(e,[],t):r.evaluated||i(r,t),n=r.module.exports;else if(n=t.get(e),!n)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&n&&n.__useDefault?n["default"]:n}function i(t,n){if(!t.module){var r={},a=t.module={exports:r,id:t.name,deps:t.normalizedDeps};if(!t.executingRequire)for(var o=0,s=t.normalizedDeps.length;s>o;o++){var l=t.normalizedDeps[o],u=n.defined[l];u&&i(u,n)}t.evaluated=!0;var c=t.execute.call(e,function(e){for(var r=0,a=t.deps.length;a>r;r++)if(t.deps[r]==e)return d(t.normalizedDeps[r],n);throw new TypeError("Module "+e+" not declared as a dependency.")},r,a);if(c&&(a.exports=c),r=a.exports,r&&r.__esModule)t.esModule=r;else{var f=r&&r.hasOwnProperty;t.esModule={};for(var m in r)(!f||r.hasOwnProperty(m))&&(t.esModule[m]=r[m]);t.esModule["default"]=r,t.esModule.__useDefault=!0}}}function f(t,n,r){var a=r.defined[t];if(a&&!a.evaluated&&a.declarative){n.push(t);for(var o=0,d=a.normalizedDeps.length;d>o;o++){var s=a.normalizedDeps[o];-1==h.call(n,s)&&(r.defined[s]?f(s,n,r):r.get(s))}a.evaluated||(a.evaluated=!0,a.module.execute.call(e))}}var m,p;s.prototype.register=function(e,n,r){return"string"!=typeof e&&(r=n,n=e,e=null),"boolean"==typeof r?this.registerDynamic.apply(this,arguments):void t(this,e,{declarative:!0,deps:n,declare:r})},s.prototype.registerDynamic=function(e,n,r,a){"string"!=typeof e&&(a=r,r=n,n=e,e=null),t(this,e,{declarative:!1,deps:n,execute:a,executingRequire:r})},u(function(e){return function(){e.call(this),this.defined={}}}),l("onScriptLoad",function(e){return function(t){e.call(this,t),m&&(t.metadata.entry=m),p&&(t.metadata.format=t.metadata.format||"register",t.metadata.registered=!0,p=!1,m=null)}});var v={};l("delete",function(e){return function(t){return delete v[t],delete loader.defined[t],e.call(this,t)}});var g=/^\s*(\/\*.*\*\/\s*|\/\/[^\n]*\s*)*System\.register(Dyanmic)?\s*\(/;l("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(m=null,p=!1,"register"==t.metadata.format&&(t.metadata.scriptLoad=!0),e.call(this,t))}}),l("translate",function(e){return function(t){return Promise.resolve(e.call(this,t)).then(function(e){return"string"==typeof t.metadata.deps&&(t.metadata.deps=t.metadata.deps.split(",")),t.metadata.deps=t.metadata.deps||[],("register"==t.metadata.format||!t.metadata.format&&t.source.match(g))&&(t.metadata.format="register"),e})}}),l("instantiate",function(e){return function(t){var n,a=this;if(a.defined[t.name])n=a.defined[t.name],n.deps=n.deps.concat(t.metadata.deps);else if(t.metadata.entry)n=t.metadata.entry;else if(t.metadata.execute)n={declarative:!1,deps:t.metadata.deps||[],execute:t.metadata.execute,executingRequire:t.metadata.executingRequire};else if(!("register"!=t.metadata.format&&"es"!=t.metadata.format&&"es6"!=t.metadata.format||(m=null,p=!1,__exec.call(a,t),m?n=m:t.metadata.bundle=!0,!n&&a.defined[t.name]&&(n=a.defined[t.name]),p||t.metadata.registered)))throw new TypeError(t.name+" detected as System.register but didn't execute.");if(!n)return{deps:t.metadata.deps,execute:function(){return a.newModule({})}};if(!n)return e.call(a,t);a.defined[t.name]=n,n.deps=c(n.deps),n.name=t.name;for(var o=[],d=0,s=n.deps.length;s>d;d++)o.push(Promise.resolve(a.normalize(n.deps[d],t.name)));return Promise.all(o).then(function(e){return n.normalizedDeps=e,{deps:n.deps,execute:function(){return r(t.name,a),f(t.name,[],a),a.defined[t.name]=void 0,a.newModule(n.declarative?n.module.exports:n.esModule)}}})}})}(),w=new s,w.constructor=s,"object"==typeof exports&&(module.exports=a),e.Reflect=e.Reflect||{},e.Reflect.Loader=e.Reflect.Loader||a,e.Reflect.global=e.Reflect.global||e,e.LoaderPolyfill=a,w||(w=new o,w.constructor=o),"object"==typeof exports&&(module.exports=w),e.System=w}("undefined"!=typeof self?self:global);
//# sourceMappingURL=dist/system-register-only.js.map