/*\

title: $:/plugins/felixhayashi/tiddlymap/utils.js
type: application/javascript
module-type: library

ATTENTION: THIS CLASS MUST NOT REQUIRE ANY OTHER TIDDLYMAP FILE
IN ORDER TO AVOID ACYCLIC DEPENDENCIES!

@preserve

\*/
(function(){var e=require("$:/plugins/felixhayashi/vis/vis.js");var t=require("$:/plugins/felixhayashi/tiddlymap/exception.js").Exception;var r={};r.deleteTiddlers=function(e){var t=Object.keys(e);for(var n=0;n<t.length;n++){if(r.tiddlerExists(e[t[n]])){var i=r.getTiddlerRef(e[t[n]]);$tw.wiki.deleteTiddler(i)}}};r.moveFieldValues=function(e,t,n,i){var l=$tw.wiki.allTitles();for(var a=0;a<l.length;a++){var f=r.getTiddler(l[a]);if(f.isDraft()||!f.fields[e]||!i&&$tw.wiki.isSystemTiddler(l[a])){continue}var u={};u[t]=f.fields[e];if(n){u[e]=undefined}$tw.wiki.addTiddler(new $tw.Tiddler(f,u))}};r.getTiddlerIds=function(e,t){var n=[];var i=Object.keys(e);for(var l=0;l<i.length;l++){if(r.tiddlerExists(e[i[l]])){var a=r.getTiddler(e[i[l]]).fields[t];n.push(a)}}return n};r.getLabel=function(e,t){var n=r.getTiddler(e);return n&&n.fields[t]?n.fields[t]:n.fields.title};r.convert=function(t,n){if(typeof t!=="object")return;switch(n){case"array":return r.getValues(t);case"hashmap":case"object":if(t instanceof e.DataSet){return e.get({returnType:"Object"})}else{return t}case"dataset":default:if(t instanceof e.DataSet){return t}if(!Array.isArray(t)){t=r.getValues(t)}return new e.DataSet(t)}};r.inject=function(t,n){if(n instanceof e.DataSet){n.update(r.convert(t,"array"))}else if(Array.isArray(n)){t=r.convert(t,"object");for(var i in t){if(!r.inArray(t[i],n)){n.push(t[i])}}}else{$tw.utils.extend(n,r.convert(t,"object"))}return n};r.refresh=function(t,n,i){if(!i){return new e.DataSet(r.convert(t,"array"))}var l={updated:r.convert(t,"array"),removed:[]};for(var a in n){if(!t[a]){l.removed.push(a)}}i.remove(l.removed);i.update(l.updated);return i};r.getValues=function(t){if(Array.isArray(t)){return t}if(t instanceof e.DataSet){return t.get({returnType:"Array"})}var r=[];var n=Object.keys(t);for(var i=0;i<n.length;i++){r.push(t[n[i]])}return r};r.hasOwnProp=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.getDataMap=function(){var e=Object.create(null);Object.defineProperty(e,"hasOwnProperty",{enumerable:false,configurable:false,writable:false,value:Object.prototype.hasOwnProperty.bind(e)});return e};r.getMatches=function(e,t,n){var i=undefined;if(t!==null&&typeof t==="object"){var l=Object.keys(t);i=function(e){for(var n=0;n<l.length;n++){var i=r.getTiddler(t[l[n]]);if(i){e(i,i.fields.title)}}}}if(typeof e==="string"){e=$tw.wiki.compileFilter(e)}var a=e.call($tw.wiki,i);if(n){var f=r.getDataMap();for(var u=0;u<a.length;u++){f[a[u]]=$tw.wiki.getTiddler(a[u])}return f}else{return a}};r.isMatch=function(e,t){var n=r.getTiddlerRef(e);return r.getMatches(t,[n]).length>0};r.escapeRegex=function(e){return e.replace(/[^$-*?+.()|{}[\]]/g,"\\$&")};r.isTrue=function(e,t){if(e==null){return t}else if(typeof e==="string"){var r=parseInt(e);return isNaN(r)?e==="true":r!==0;if(e==="1"||this.data[conf]==="true");}else if(typeof e==="boolean"){return e}else if(typeof e==="number"){return r!==0}return false};r.getTiddlerRef=function(e){if(e instanceof $tw.Tiddler){return e.fields.title}else if(typeof e==="string"){return e}};r.getTiddler=function(e,t){if(e instanceof $tw.Tiddler){if(!t){return e}e=e.fields.title}return $tw.wiki.getTiddler(e)};r.getBasename=function(e){return e.substring(e.lastIndexOf("/")+1)};r.notify=function(e){var t="$:/temp/tiddlymap/notify";$tw.wiki.addTiddler(new $tw.Tiddler({title:t,text:e}));$tw.notifier.display(t)};r.tiddlerExists=function(e){var t=r.getTiddlerRef(e);return t&&($tw.wiki.tiddlerExists(t)||$tw.wiki.isShadowTiddler(t))};r.addListeners=function(e,t,r){for(var n in e){t.addEventListener(n,e[n].bind(r))}};r.getPropertiesByPrefix=function(e,t,n){var i=r.getDataMap();for(var l in e){if(r.startsWith(l,t)){i[n?l.substr(t.length):l]=e[l]}}return i};r.getWithoutPrefix=function(e,t){return r.startsWith(e,t)?e.substr(t.length):e};r.startsWith=function(e,t){return typeof e==="string"&&e.indexOf(t)===0};r.hasElements=function(e){return Object.keys(e).length>0};r.groupByProperty=function(e,t){e=r.getIterableCollection(e);var n=r.getDataMap();var i=Object.keys(e);for(var l in i){var a=e[i[l]];var f=a[t];if(f==null){throw"Cannot group by property "+t}else{if(!Array.isArray(n[f])){n[f]=[]}n[f].push(a)}}return n};r.findAndRemoveClassNames=function(e){for(var t=0;t<e.length;t++){var r=document.getElementsByClassName(e[t]);for(var n=0;n<r.length;n++){$tw.utils.removeClass(r[n],e[t])}}};r.parseFieldData=function(e,t,n){var i=r.getTiddler(e);if(!i)throw"tmap: Cannot parse field of "+e;if(!t)t="text";return r.parseJSON(i.fields[t],n)};r.parseJSON=function(e,t){try{return JSON.parse(e)}catch(r){return t}};r.writeFieldData=function(e,t,n){if(typeof n==="object"){r.setField(e,t,JSON.stringify(n))}};r.getPrettyFilter=function(e){e=e.trim().replace("][","] [");var t=/[\+\-]?\[.+?[\]\}\>]\]/g;var r=e.match(t);e=e.replace(t," [] ").trim();var n=e.split(/\s+/);var i=0;var l=[];for(var a=0;a<n.length;a++){l[a]=n[a]==="[]"?r[i++]:n[a]}return l.join("\n")};r.setField=function(e,t,n){if(e&&t){var i={title:r.getTiddlerRef(e)};i[t]=n;var l=r.getTiddler(e,true);$tw.wiki.addTiddler(new $tw.Tiddler(l,i))}};r.setEntry=function(e,t,n){$tw.wiki.setText(r.getTiddlerRef(e),null,t,n)};r.getEntry=function(e,t,n){var i=$tw.wiki.getTiddlerData(r.getTiddlerRef(e),{});return i[t]==null?n:i[t]};r.getField=function(e,t,n){var i=r.getTiddler(e);return i?i.fields[t]:n?n:""};r.getText=function(e,t){return r.getField(e,"text",t)};r.isDraft=function(e){return r.getTiddler(e)&&r.getTiddler(e).isDraft()};r.merge=function(e,t){var r=function(e,t){if(typeof e!=="object"){e={}}for(var n in t){if(t.hasOwnProperty(n)){if(t[n]!=null){e[n]=typeof t[n]==="object"?r(e[n],t[n]):t[n]}}}return e};return r(e,t)};r.drawRaster=function(e,t,r){t=parseInt(t)||10;var n=e.getContext("2d");var i=e.width/t;var l=e.height/t;for(var a=0;a<e.width;a+=t){n.moveTo(a,0);n.lineTo(a,e.height)}for(var f=0;f<e.height;f+=t){n.moveTo(0,f);n.lineTo(e.width,f)}n.strokeStyle=r||"black";n.stroke()};r.isSystemOrDraft=function(e){if($tw.wiki.isSystemTiddler(r.getTiddlerRef(e))){return true}else{var t=r.getTiddler(e);return t&&t.isDraft()}};r.inArray=function(e,t){return t.indexOf(e)!==-1};r.hasSubString=function(e,t){return e.indexOf(t)!==-1};r.joinAndWrap=function(e,t,r,n){if(!n)n=" ";return t+e.join(r+n+t)+r};r.keysOfItemsWithProperty=function(e,t,n,i){e=r.getIterableCollection(e);var l=Object.keys(e);var a=[];var i=typeof i==="number"?i:l.length;for(var f=0;f<l.length;f++){var u=l[f];if(typeof e[u]==="object"&&e[u][t]){if(!n||e[u][t]===n){a.push(u);if(a.length===i){break}}}}return a};r.keyOfItemWithProperty=function(e,t,n){var i=r.keysOfItemsWithProperty(e,t,n,1);return i.length?i[0]:undefined};r.deleteByPrefix=function(e){r.deleteTiddlers(r.getByPrefix(e))};r.getByPrefix=function(e){return r.getMatches("[prefix["+e+"]]")};r.getIterableCollection=function(t){return t instanceof e.DataSet?t.get():t};r.getLookupTable=function(e,t){e=r.getIterableCollection(e);var n=r.getDataMap();var i=Object.keys(e);for(var l=0;l<i.length;l++){var a=i[l];var f=t?e[a][t]:e[a];if(typeof f==="string"&&f!=""||typeof f==="number"){if(!n[f]){n[f]=e[a];continue}}throw'TiddlyMap: Cannot use "'+f+'" as lookup table index'}return n};r.getArrayValuesAsHashmapKeys=function(e){return r.getLookupTable(e)};r.getTiddlersWithField=function(e,t,n){if(!n||typeof n!=="object")n={};var i=r.getDataMap();var l=n.tiddlers?n.tiddlers:$tw.wiki.allTitles();var a=n.limit?n.limit:0;var f=n.isIncludeDrafts===true;var i=r.getDataMap();var u=Object.keys(l);for(var s=0;s<u.length;s++){var o=r.getTiddler(l[u[s]]);if(o.hasField(e)&&(!o.isDraft()||f)){if(!t||o.fields[e]===t){i[o.fields.title]=o;if(--a===0)break}}}return i};r.getPrefixFilter=function(e,t,r){return"["+"all[tiddlers+shadows]prefix["+e+"]"+"!has[draft.of]"+(t?"has["+t+"]":"")+(r?"removeprefix["+e+"/]":"")+"]"};r.Exception=t;r.getFullScreenApis=function(){var e=document,t=e.body,r={_requestFullscreen:t.webkitRequestFullscreen!==undefined?"webkitRequestFullscreen":t.mozRequestFullScreen!==undefined?"mozRequestFullScreen":t.msRequestFullscreen!==undefined?"msRequestFullscreen":t.requestFullscreen!==undefined?"requestFullscreen":"",_exitFullscreen:e.webkitExitFullscreen!==undefined?"webkitExitFullscreen":e.mozCancelFullScreen!==undefined?"mozCancelFullScreen":e.msExitFullscreen!==undefined?"msExitFullscreen":e.exitFullscreen!==undefined?"exitFullscreen":"",_fullscreenElement:e.webkitFullscreenElement!==undefined?"webkitFullscreenElement":e.mozFullScreenElement!==undefined?"mozFullScreenElement":e.msFullscreenElement!==undefined?"msFullscreenElement":e.fullscreenElement!==undefined?"fullscreenElement":"",_fullscreenChange:e.webkitFullscreenElement!==undefined?"webkitfullscreenchange":e.mozFullScreenElement!==undefined?"mozfullscreenchange":e.msFullscreenElement!==undefined?"MSFullscreenChange":e.fullscreenElement!==undefined?"fullscreenchange":""};if(!r._requestFullscreen||!r._exitFullscreen||!r._fullscreenElement){return null}else{return r}};r.flatten=function(e,t){t=t||{};var r=t.delimiter||".";var n=t.prefix||"";var i={};function l(e,a){Object.keys(e).forEach(function(f){var u=e[f];var s=t.safe&&Array.isArray(u);var o=Object.prototype.toString.call(u);var d=o==="[object Object]"||o==="[object Array]";var c=a?a+r+f:n+f;if(!s&&d){return l(u,c)}i[c]=u})}l(e);return i};r.unflatten=function(e,t){t=t||{};var n=t.delimiter||".";var i={};if(Object.prototype.toString.call(e)!=="[object Object]"){return e}function l(e){var t=Number(e);return isNaN(t)||e.indexOf(".")!==-1?e:t}Object.keys(e).forEach(function(a){var f=a.split(n);var u=l(f.shift());var s=l(f[0]);var o=i;while(s!==undefined){if(o[u]===undefined){o[u]=typeof s==="number"&&!t.object?[]:{}}o=o[u];if(f.length>0){u=l(f.shift());s=l(f[0])}}o[u]=r.unflatten(e[a],t)});return i};r.genUUID=function(){var e="0123456789abcdefghijklmnopqrstuvwxyz".split("");return function(){var t=e,r=new Array(36);var n=0,i;for(var l=0;l<36;l++){if(l==8||l==13||l==18||l==23){r[l]="-"}else if(l==14){r[l]="4"}else{if(n<=2)n=33554432+Math.random()*16777216|0;i=n&15;n=n>>4;r[l]=t[l==19?i&3|8:i]}}return r.join("")}}();exports.utils=r})();