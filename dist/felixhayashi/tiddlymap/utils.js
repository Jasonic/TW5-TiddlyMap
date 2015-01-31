/*\

title: $:/plugins/felixhayashi/tiddlymap/utils.js
type: application/javascript
module-type: library

ATTENTION: THIS CLASS MUST NOT REQUIRE ANY OTHER TIDDLYMAP FILE
IN ORDER TO AVOID ACYCLIC DEPENDENCIES!

@preserve

\*/
(function(){var e=require("$:/plugins/felixhayashi/vis/vis.js");var t=require("$:/plugins/felixhayashi/tiddlymap/exception.js").Exception;var r={};r.deleteTiddlers=function(e){var t=Object.keys(e);for(var n=0;n<t.length;n++){if(r.tiddlerExists(e[t[n]])){var i=r.getTiddlerReference(e[t[n]]);$tw.wiki.deleteTiddler(i)}}};r.getTiddlerIds=function(e,t){var n=[];var i=Object.keys(e);for(var l=0;l<i.length;l++){if(r.tiddlerExists(e[i[l]])){var a=r.getTiddler(e[i[l]]).fields[t];n.push(a)}}return n};r.getTiddlerById=function(e,t){if(!t)t="id";var n=$tw.wiki.allTitles();for(var i=0;i<n.length;i++){var l=r.getTiddler(n[i]);if(l.fields[t]===e){return l}}};r.getLabel=function(e,t){var n=r.getTiddler(e);return n&&n.fields[t]?n.fields[t]:n.fields.title};r.convert=function(t,n){if(typeof t!=="object")return;switch(n){case"array":return r.getValues(t);case"hashmap":case"object":if(t instanceof e.DataSet){return e.get({returnType:"Object"})}else{return t}case"dataset":default:if(t instanceof e.DataSet){return t}if(!Array.isArray(t)){t=r.getValues(t)}return new e.DataSet(t)}};r.inject=function(t,n){if(n instanceof e.DataSet){n.update(r.convert(t,"array"))}else if(Array.isArray(n)){t=r.convert(t,"object");for(var i in t){if(n.indexOf(t[i])==-1){n.push(t[i])}}}else{$tw.utils.extend(n,r.convert(t,"object"))}return n};r.refresh=function(t,n,i){if(!i){return new e.DataSet(r.convert(t,"array"))}var l={updated:r.convert(t,"array"),removed:[]};for(var a in n){if(!t[a])l.removed.push(a)}i.remove(l.removed);i.update(l.updated);return i};r.getValues=function(t){if(Array.isArray(t)){return t}if(t instanceof e.DataSet){return t.get({returnType:"Array"})}var r=[];var n=Object.keys(t);for(var i=0;i<n.length;i++){r.push(t[n[i]])}return r};r.hasOwnProp=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.getEmptyMap=function(){var e=Object.create(null);Object.defineProperty(e,"hasOwnProperty",{enumerable:false,configurable:false,writable:false,value:Object.prototype.hasOwnProperty.bind(e)});return e};r.getMatches=function(e,t,n){var i=undefined;if(typeof t==="object"){var l=Object.keys(t);i=function(e){for(var n=0;n<l.length;n++){var i=r.getTiddler(t[l[n]]);if(i){e(i,i.fields.title)}}}}if(typeof e==="string"){e=$tw.wiki.compileFilter(e)}var a=e.call($tw.wiki,i);return a};r.isMatch=function(e,t){var n=r.getTiddlerReference(e);return r.getMatches(t,[n]).length>0};r.getTiddlerReference=function(e){if(e instanceof $tw.Tiddler){return e.fields.title}else if(typeof e==="string"){return e}};r.getTiddler=function(e){return e instanceof $tw.Tiddler?e:$tw.wiki.getTiddler(e)};r.getBasename=function(e){return e.substring(e.lastIndexOf("/")+1)};r.notify=function(e){var t="$:/temp/tiddlymap/notify";$tw.wiki.addTiddler(new $tw.Tiddler({title:t,text:e}));$tw.notifier.display(t)};r.tiddlerExists=function(e){var t=r.getTiddlerReference(e);return t&&($tw.wiki.tiddlerExists(t)||$tw.wiki.isShadowTiddler(t))};r.getPropertiesByPrefix=function(e,t,n){var i=r.getEmptyMap();for(var l in e){if(r.startsWith(l,t)){i[n?l.substr(t.length):l]=e[l]}}return i};r.startsWith=function(e,t){return typeof e==="string"&&e.indexOf(t)===0};r.hasElements=function(e){return Object.keys(e).length>0};r.findAndRemoveClassNames=function(e){for(var t=0;t<e.length;t++){var r=document.getElementsByClassName(e[t]);for(var n=0;n<r.length;n++){$tw.utils.removeClass(r[n],e[t])}}};r.isDraft=function(e){return r.getTiddler(e)&&r.getTiddler(e).isDraft()};r.getText=function(e,t){if(!t){t=""}var n=r.getTiddler(e);return n?n.fields.text:t};r.keysOfItemsWithProperty=function(e,t,n,i){e=r.getIterableCollection(e);var l=Object.keys(e);var a=[];var i=typeof i==="number"?i:l.length;for(var u=0;u<l.length;u++){var s=l[u];if(typeof e[s]==="object"&&e[s][t]){if(!n||e[s][t]===n){a.push(s);if(a.length===i){break}}}}return a};r.keyOfItemWithProperty=function(e,t,n){var i=r.keysOfItemsWithProperty(e,t,n,1);return i.length?i[0]:undefined};r.getIterableCollection=function(t){return t instanceof e.DataSet?t.get():t};r.getLookupTable=function(e,t){e=r.getIterableCollection(e);var n=r.getEmptyMap();var i=Object.keys(e);for(var l=0;l<i.length;l++){var a=i[l];var u=t?e[a][t]:e[a];if(typeof u==="string"&&u!=""||typeof u==="number"){if(!n[u]){n[u]=e[a];continue}}throw'TiddlyMap: Cannot use "'+u+'" as lookup table index'}return n};r.getArrayValuesAsHashmapKeys=function(e){return r.getLookupTable(e)};r.getTiddlersWithProperty=function(e,t,n){if(typeof n!=="object")n=r.getEmptyMap();if(!n.tiddlers){n.tiddlers=$tw.wiki.allTitles()}var i=[];var l=n.isReturnRef;var a=Object.keys(n.tiddlers);for(var u=0;u<a.length;u++){var s=r.getTiddler(n.tiddlers[a[u]]);if(s.fields[e]===t){i.push(l?s.fields.title:s);if(n.isIncludeDrafts){var f=$tw.wiki.findDraft(s.fields.title);if(f){i.push(l?f:$tw.wiki.getTiddler(f))}}}}return i};r.getFullScreenApis=function(){var e=document,t=e.body,r={_requestFullscreen:t.webkitRequestFullscreen!==undefined?"webkitRequestFullscreen":t.mozRequestFullScreen!==undefined?"mozRequestFullScreen":t.msRequestFullscreen!==undefined?"msRequestFullscreen":t.requestFullscreen!==undefined?"requestFullscreen":"",_exitFullscreen:e.webkitExitFullscreen!==undefined?"webkitExitFullscreen":e.mozCancelFullScreen!==undefined?"mozCancelFullScreen":e.msExitFullscreen!==undefined?"msExitFullscreen":e.exitFullscreen!==undefined?"exitFullscreen":"",_fullscreenElement:e.webkitFullscreenElement!==undefined?"webkitFullscreenElement":e.mozFullScreenElement!==undefined?"mozFullScreenElement":e.msFullscreenElement!==undefined?"msFullscreenElement":e.fullscreenElement!==undefined?"fullscreenElement":"",_fullscreenChange:e.webkitFullscreenElement!==undefined?"webkitfullscreenchange":e.mozFullScreenElement!==undefined?"mozfullscreenchange":e.msFullscreenElement!==undefined?"MSFullscreenChange":e.fullscreenElement!==undefined?"fullscreenchange":""};if(!r._requestFullscreen||!r._exitFullscreen||!r._fullscreenElement){return null}else{return r}};r.flatten=function(e,t){t=t||{};var r=t.delimiter||".";var n={};function i(e,l){Object.keys(e).forEach(function(a){var u=e[a];var s=t.safe&&Array.isArray(u);var f=Object.prototype.toString.call(u);var d=f==="[object Object]"||f==="[object Array]";var c=l?l+r+a:t.prefix+a;if(!s&&d){return i(u,c)}n[c]=u})}i(e);return n};r.unflatten=function(e,t){t=t||{};var r=t.delimiter||".";var n={};if(Object.prototype.toString.call(e)!=="[object Object]"){return e}function i(e){var t=Number(e);return isNaN(t)||e.indexOf(".")!==-1?e:t}Object.keys(e).forEach(function(l){var a=l.split(r);var u=i(a.shift());var s=i(a[0]);var f=n;while(s!==undefined){if(f[u]===undefined){f[u]=typeof s==="number"&&!t.object?[]:{}}f=f[u];if(a.length>0){u=i(a.shift());s=i(a[0])}}f[u]=unflatten(e[l],t)});return n};r.genUUID=function(){var e="0123456789abcdefghijklmnopqrstuvwxyz".split("");return function(){var t=e,r=new Array(36);var n=0,i;for(var l=0;l<36;l++){if(l==8||l==13||l==18||l==23){r[l]="-"}else if(l==14){r[l]="4"}else{if(n<=2)n=33554432+Math.random()*16777216|0;i=n&15;n=n>>4;r[l]=t[l==19?i&3|8:i]}}return r.join("")}}();r.Exception=t;exports.utils=r})();