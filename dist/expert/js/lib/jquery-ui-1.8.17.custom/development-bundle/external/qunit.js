/*
*
* PHYLO Distribution Build v3.1.0
* http://phylo.cs.mcgill.ca
*
* Copyright 2013 McGill university, Alfred Kam, Jerome Waldispuhl and other contributors
* Under McGill Human-Computing Developer Licence
* https://github.com/McGill-CSB/PHYLO/blob/master/McGill-LICENCE.txt
*
*/!function(a){function b(){t.autorun=!0,t.currentModule&&s.moduleDone({name:t.currentModule,failed:t.moduleStats.bad,passed:t.moduleStats.all-t.moduleStats.bad,total:t.moduleStats.all});var a=n("qunit-banner"),b=n("qunit-tests"),c=+new Date-t.started,d=t.stats.all-t.stats.bad,e=["Tests completed in ",c," milliseconds.<br/>",'<span class="passed">',d,'</span> tests of <span class="total">',t.stats.all,'</span> passed, <span class="failed">',t.stats.bad,"</span> failed."].join("");a&&(a.className=t.stats.bad?"qunit-fail":"qunit-pass"),b&&(n("qunit-testresult").innerHTML=e),"undefined"!=typeof document&&document.title&&(document.title=(t.stats.bad?"✖":"✔")+" "+document.title),s.done({failed:t.stats.bad,passed:d,total:t.stats.all,runtime:c})}function c(a){var b=t.filter,c=!1;if(!b)return!0;var d="!"===b.charAt(0);return d&&(b=b.slice(1)),-1!==a.indexOf(b)?!d:(d&&(c=!0),c)}function d(){try{throw new Error}catch(a){if(a.stacktrace)return a.stacktrace.split("\n")[6];if(a.stack)return a.stack.split("\n")[4]}}function e(a){return a?(a+="",a.replace(/[\&"<>\\]/g,function(a){switch(a){case"&":return"&amp;";case"\\":return"\\\\";case'"':return'"';case"<":return"&lt;";case">":return"&gt;";default:return a}})):""}function f(a){t.queue.push(a),t.autorun&&!t.blocking&&g()}function g(){for(var c=(new Date).getTime();t.queue.length&&!t.blocking;){if(!(t.updateRate<=0||(new Date).getTime()-c<t.updateRate)){a.setTimeout(g,13);break}t.queue.shift()()}t.blocking||t.queue.length||b()}function h(){if(t.pollution=[],t.noglobals)for(var b in a)t.pollution.push(b)}function i(){var a=t.pollution;h();var b=j(t.pollution,a);b.length>0&&ok(!1,"Introduced global variable(s): "+b.join(", "));var c=j(a,t.pollution);c.length>0&&ok(!1,"Deleted global variable(s): "+c.join(", "))}function j(a,b){for(var c=a.slice(),d=0;d<c.length;d++)for(var e=0;e<b.length;e++)if(c[d]===b[e]){c.splice(d,1),d--;break}return c}function k(b,c,d){"undefined"!=typeof console&&console.error&&console.warn?(console.error(b),console.error(c),console.warn(d.toString())):a.opera&&opera.postError&&opera.postError(b,c,d.toString)}function l(a,b){for(var c in b)void 0===b[c]?delete a[c]:a[c]=b[c];return a}function m(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):c()}function n(a){return!("undefined"==typeof document||!document||!document.getElementById)&&document.getElementById(a)}function o(a){for(var b,c="",d=0;a[d];d++)b=a[d],3===b.nodeType||4===b.nodeType?c+=b.nodeValue:8!==b.nodeType&&(c+=o(b.childNodes));return c}var p={setTimeout:"undefined"!=typeof a.setTimeout,sessionStorage:function(){try{return!!sessionStorage.getItem}catch(a){return!1}}()},q=0,r=function(a,b,c,d,e,f){this.name=a,this.testName=b,this.expected=c,this.testEnvironmentArg=d,this.async=e,this.callback=f,this.assertions=[]};r.prototype={init:function(){var a=n("qunit-tests");if(a){var b=document.createElement("strong");b.innerHTML="Running "+this.name;var c=document.createElement("li");c.appendChild(b),c.className="running",c.id=this.id="test-output"+q++,a.appendChild(c)}},setup:function(){this.module!=t.previousModule&&(t.previousModule&&s.moduleDone({name:t.previousModule,failed:t.moduleStats.bad,passed:t.moduleStats.all-t.moduleStats.bad,total:t.moduleStats.all}),t.previousModule=this.module,t.moduleStats={all:0,bad:0},s.moduleStart({name:this.module})),t.current=this,this.testEnvironment=l({setup:function(){},teardown:function(){}},this.moduleTestEnvironment),this.testEnvironmentArg&&l(this.testEnvironment,this.testEnvironmentArg),s.testStart({name:this.testName}),s.current_testEnvironment=this.testEnvironment;try{t.pollution||h(),this.testEnvironment.setup.call(this.testEnvironment)}catch(a){s.ok(!1,"Setup failed on "+this.testName+": "+a.message)}},run:function(){if(this.async&&s.stop(),t.notrycatch)return void this.callback.call(this.testEnvironment);try{this.callback.call(this.testEnvironment)}catch(a){k("Test "+this.testName+" died, exception and test follows",a,this.callback),s.ok(!1,"Died on test #"+(this.assertions.length+1)+": "+a.message+" - "+s.jsDump.parse(a)),h(),t.blocking&&start()}},teardown:function(){try{this.testEnvironment.teardown.call(this.testEnvironment),i()}catch(a){s.ok(!1,"Teardown failed on "+this.testName+": "+a.message)}},finish:function(){this.expected&&this.expected!=this.assertions.length&&s.ok(!1,"Expected "+this.expected+" assertions, but "+this.assertions.length+" were run");var b=0,c=0,d=n("qunit-tests");if(t.stats.all+=this.assertions.length,t.moduleStats.all+=this.assertions.length,d){for(var e=document.createElement("ol"),f=0;f<this.assertions.length;f++){var g=this.assertions[f],h=document.createElement("li");h.className=g.result?"pass":"fail",h.innerHTML=g.message||(g.result?"okay":"failed"),e.appendChild(h),g.result?b++:(c++,t.stats.bad++,t.moduleStats.bad++)}s.config.reorder&&p.sessionStorage&&(c?sessionStorage.setItem("qunit-"+this.module+"-"+this.testName,c):sessionStorage.removeItem("qunit-"+this.module+"-"+this.testName)),0==c&&(e.style.display="none");var i=document.createElement("strong");i.innerHTML=this.name+" <b class='counts'>(<b class='failed'>"+c+"</b>, <b class='passed'>"+b+"</b>, "+this.assertions.length+")</b>";var j=document.createElement("a");j.innerHTML="Rerun",j.href=s.url({filter:o([i]).replace(/\([^)]+\)$/,"").replace(/(^\s*|\s*$)/g,"")}),m(i,"click",function(){var a=i.nextSibling.nextSibling,b=a.style.display;a.style.display="none"===b?"block":"none"}),m(i,"dblclick",function(b){var c=b&&b.target?b.target:a.event.srcElement;("span"==c.nodeName.toLowerCase()||"b"==c.nodeName.toLowerCase())&&(c=c.parentNode),a.location&&"strong"===c.nodeName.toLowerCase()&&(a.location=s.url({filter:o([c]).replace(/\([^)]+\)$/,"").replace(/(^\s*|\s*$)/g,"")}))});var h=n(this.id);h.className=c?"fail":"pass",h.removeChild(h.firstChild),h.appendChild(i),h.appendChild(j),h.appendChild(e)}else for(var f=0;f<this.assertions.length;f++)this.assertions[f].result||(c++,t.stats.bad++,t.moduleStats.bad++);try{s.reset()}catch(l){k("reset() failed, following Test "+this.testName+", exception and reset fn follows",l,s.reset)}s.testDone({name:this.testName,failed:c,passed:this.assertions.length-c,total:this.assertions.length})},queue:function(){function a(){f(function(){b.setup()}),f(function(){b.run()}),f(function(){b.teardown()}),f(function(){b.finish()})}var b=this;f(function(){b.init()});var c=s.config.reorder&&p.sessionStorage&&+sessionStorage.getItem("qunit-"+this.module+"-"+this.testName);c?a():f(a)}};var s={module:function(a,b){t.currentModule=a,t.currentModuleTestEnviroment=b},asyncTest:function(a,b,c){2===arguments.length&&(c=b,b=0),s.test(a,b,c,!0)},test:function(a,b,d,e){var f,g='<span class="test-name">'+a+"</span>";if(2===arguments.length&&(d=b,b=null),b&&"object"==typeof b&&(f=b,b=null),t.currentModule&&(g='<span class="module-name">'+t.currentModule+"</span>: "+g),c(t.currentModule+": "+a)){var h=new r(g,a,b,f,e,d);h.module=t.currentModule,h.moduleTestEnvironment=t.currentModuleTestEnviroment,h.queue()}},expect:function(a){t.current.expected=a},ok:function(a,b){a=!!a;var c={result:a,message:b};b=e(b),s.log(c),t.current.assertions.push({result:a,message:b})},equal:function(a,b,c){s.push(b==a,a,b,c)},notEqual:function(a,b,c){s.push(b!=a,a,b,c)},deepEqual:function(a,b,c){s.push(s.equiv(a,b),a,b,c)},notDeepEqual:function(a,b,c){s.push(!s.equiv(a,b),a,b,c)},strictEqual:function(a,b,c){s.push(b===a,a,b,c)},notStrictEqual:function(a,b,c){s.push(b!==a,a,b,c)},raises:function(a,b,c){var d,e=!1;"string"==typeof b&&(c=b,b=null);try{a()}catch(f){d=f}d&&(b?"regexp"===s.objectType(b)?e=b.test(d):d instanceof b?e=!0:b.call({},d)===!0&&(e=!0):e=!0),s.ok(e,c)},start:function(){t.semaphore--,t.semaphore>0||(t.semaphore<0&&(t.semaphore=0),p.setTimeout?a.setTimeout(function(){t.timeout&&clearTimeout(t.timeout),t.blocking=!1,g()},13):(t.blocking=!1,g()))},stop:function(b){t.semaphore++,t.blocking=!0,b&&p.setTimeout&&(clearTimeout(t.timeout),t.timeout=a.setTimeout(function(){s.ok(!1,"Test timed out"),s.start()},b))}};s.equals=s.equal,s.same=s.deepEqual;var t={queue:[],blocking:!0,reorder:!0,noglobals:!1,notrycatch:!1};!function(){var b,c=a.location||{search:"",protocol:"file:"},d=c.search.slice(1).split("&"),e=d.length,f={};if(d[0])for(var g=0;e>g;g++)b=d[g].split("="),b[0]=decodeURIComponent(b[0]),b[1]=b[1]?decodeURIComponent(b[1]):!0,f[b[0]]=b[1],b[0]in t&&(t[b[0]]=b[1]);s.urlParams=f,t.filter=f.filter,s.isLocal=!("file:"!==c.protocol)}(),"undefined"==typeof exports||"undefined"==typeof require?(l(a,s),a.QUnit=s):(l(exports,s),exports.QUnit=s),l(s,{config:t,init:function(){l(t,{stats:{all:0,bad:0},moduleStats:{all:0,bad:0},started:+new Date,updateRate:1e3,blocking:!1,autostart:!0,autorun:!1,filter:"",queue:[],semaphore:0});var a=n("qunit-tests"),b=n("qunit-banner"),c=n("qunit-testresult");a&&(a.innerHTML=""),b&&(b.className=""),c&&c.parentNode.removeChild(c),a&&(c=document.createElement("p"),c.id="qunit-testresult",c.className="result",a.parentNode.insertBefore(c,a),c.innerHTML="Running...<br/>&nbsp;")},reset:function(){if(a.jQuery)jQuery("#qunit-fixture").html(t.fixture);else{var b=n("qunit-fixture");b&&(b.innerHTML=t.fixture)}},triggerEvent:function(a,b,c){document.createEvent?(c=document.createEvent("MouseEvents"),c.initMouseEvent(b,!0,!0,a.ownerDocument.defaultView,0,0,0,0,0,!1,!1,!1,!1,0,null),a.dispatchEvent(c)):a.fireEvent&&a.fireEvent("on"+b)},is:function(a,b){return s.objectType(b)==a},objectType:function(a){if("undefined"==typeof a)return"undefined";if(null===a)return"null";var b=Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]||"";switch(b){case"Number":return isNaN(a)?"nan":"number";case"String":case"Boolean":case"Array":case"Date":case"RegExp":case"Function":return b.toLowerCase()}return"object"==typeof a?"object":void 0},push:function(a,b,c,f){var g={result:a,message:f,actual:b,expected:c};f=e(f)||(a?"okay":"failed"),f='<span class="test-message">'+f+"</span>",c=e(s.jsDump.parse(c)),b=e(s.jsDump.parse(b));var h=f+'<table><tr class="test-expected"><th>Expected: </th><td><pre>'+c+"</pre></td></tr>";if(b!=c&&(h+='<tr class="test-actual"><th>Result: </th><td><pre>'+b+"</pre></td></tr>",h+='<tr class="test-diff"><th>Diff: </th><td><pre>'+s.diff(c,b)+"</pre></td></tr>"),!a){var i=d();i&&(g.source=i,h+='<tr class="test-source"><th>Source: </th><td><pre>'+e(i)+"</pre></td></tr>")}h+="</table>",s.log(g),t.current.assertions.push({result:!!a,message:h})},url:function(b){b=l(l({},s.urlParams),b);var c,d="?";for(c in b)d+=encodeURIComponent(c)+"="+encodeURIComponent(b[c])+"&";return a.location.pathname+d.slice(0,-1)},begin:function(){},done:function(){},log:function(){},testStart:function(){},testDone:function(){},moduleStart:function(){},moduleDone:function(){}}),("undefined"==typeof document||"complete"===document.readyState)&&(t.autorun=!0),m(a,"load",function(){s.begin({});var b=l({},t);s.init(),l(t,b),t.blocking=!1;var c=n("qunit-userAgent");c&&(c.innerHTML=navigator.userAgent);var d=n("qunit-header");d&&(d.innerHTML='<a href="'+s.url({filter:void 0})+'"> '+d.innerHTML+'</a> <label><input name="noglobals" type="checkbox"'+(t.noglobals?' checked="checked"':"")+'>noglobals</label><label><input name="notrycatch" type="checkbox"'+(t.notrycatch?' checked="checked"':"")+">notrycatch</label>",m(d,"change",function(b){var c={};c[b.target.name]=b.target.checked?!0:void 0,a.location=s.url(c)}));var e=n("qunit-testrunner-toolbar");if(e){var f=document.createElement("input");if(f.type="checkbox",f.id="qunit-filter-pass",m(f,"click",function(){var a=document.getElementById("qunit-tests");if(f.checked)a.className=a.className+" hidepass";else{var b=" "+a.className.replace(/[\n\t\r]/g," ")+" ";a.className=b.replace(/ hidepass /," ")}p.sessionStorage&&(f.checked?sessionStorage.setItem("qunit-filter-passed-tests","true"):sessionStorage.removeItem("qunit-filter-passed-tests"))}),p.sessionStorage&&sessionStorage.getItem("qunit-filter-passed-tests")){f.checked=!0;var g=document.getElementById("qunit-tests");g.className=g.className+" hidepass"}e.appendChild(f);var h=document.createElement("label");h.setAttribute("for","qunit-filter-pass"),h.innerHTML="Hide passed tests",e.appendChild(h)}var i=n("qunit-fixture");i&&(t.fixture=i.innerHTML),t.autostart&&s.start()}),s.equiv=function(){function a(a,b,c){var d=s.objectType(a);return d?"function"===s.objectType(b[d])?b[d].apply(b,c):b[d]:void 0}var b,c=[],d=[],e=function(){function a(a,b){return a instanceof b.constructor||b instanceof a.constructor?b==a:b===a}return{string:a,"boolean":a,number:a,"null":a,undefined:a,nan:function(a){return isNaN(a)},date:function(a,b){return"date"===s.objectType(a)&&b.valueOf()===a.valueOf()},regexp:function(a,b){return"regexp"===s.objectType(a)&&b.source===a.source&&b.global===a.global&&b.ignoreCase===a.ignoreCase&&b.multiline===a.multiline},"function":function(){var a=c[c.length-1];return a!==Object&&"undefined"!=typeof a},array:function(a,c){var e,f,g,h;if("array"!==s.objectType(a))return!1;if(h=c.length,h!==a.length)return!1;for(d.push(c),e=0;h>e;e++){for(g=!1,f=0;f<d.length;f++)d[f]===c[e]&&(g=!0);if(!g&&!b(c[e],a[e]))return d.pop(),!1}return d.pop(),!0},object:function(a,e){var f,g,h,i=!0,j=[],k=[];if(e.constructor!==a.constructor)return!1;c.push(e.constructor),d.push(e);for(f in e){for(h=!1,g=0;g<d.length;g++)d[g]===e[f]&&(h=!0);if(j.push(f),!h&&!b(e[f],a[f])){i=!1;break}}c.pop(),d.pop();for(f in a)k.push(f);return i&&b(j.sort(),k.sort())}}}();return b=function(){var b=Array.prototype.slice.apply(arguments);return b.length<2?!0:function(b,c){return b===c?!0:null===b||null===c||"undefined"==typeof b||"undefined"==typeof c||s.objectType(b)!==s.objectType(c)?!1:a(b,e,[c,b])}(b[0],b[1])&&arguments.callee.apply(this,b.splice(1,b.length-1))}}(),s.jsDump=function(){function a(a){return'"'+a.toString().replace(/"/g,'\\"')+'"'}function b(a){return a+""}function c(a,b,c){var d=f.separator(),e=f.indent(),g=f.indent(1);return b.join&&(b=b.join(","+d+g)),b?[a,g+b,e+c].join(d):a+c}function d(a){var b=a.length,d=Array(b);for(this.up();b--;)d[b]=this.parse(a[b]);return this.down(),c("[",d,"]")}var e=/^function (\w+)/,f={parse:function(a,b){var c=this.parsers[b||this.typeOf(a)];return b=typeof c,"function"==b?c.call(this,a):"string"==b?c:this.parsers.error},typeOf:function(a){var b;return b=null===a?"null":"undefined"==typeof a?"undefined":s.is("RegExp",a)?"regexp":s.is("Date",a)?"date":s.is("Function",a)?"function":void 0!==typeof a.setInterval&&"undefined"!=typeof a.document&&"undefined"==typeof a.nodeType?"window":9===a.nodeType?"document":a.nodeType?"node":"object"==typeof a&&"number"==typeof a.length&&a.length>=0?"array":typeof a},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&nbsp;":" "},indent:function(a){if(!this.multiline)return"";var b=this.indentChar;return this.HTML&&(b=b.replace(/\t/g,"   ").replace(/ /g,"&nbsp;")),Array(this._depth_+(a||0)).join(b)},up:function(a){this._depth_+=a||1},down:function(a){this._depth_-=a||1},setParser:function(a,b){this.parsers[a]=b},quote:a,literal:b,join:c,_depth_:1,parsers:{window:"[Window]",document:"[Document]",error:"[ERROR]",unknown:"[Unknown]","null":"null",undefined:"undefined","function":function(a){var b="function",d="name"in a?a.name:(e.exec(a)||[])[1];return d&&(b+=" "+d),b+="(",b=[b,s.jsDump.parse(a,"functionArgs"),"){"].join(""),c(b,s.jsDump.parse(a,"functionCode"),"}")},array:d,nodelist:d,arguments:d,object:function(a){var b=[];s.jsDump.up();for(var d in a)b.push(s.jsDump.parse(d,"key")+": "+s.jsDump.parse(a[d]));return s.jsDump.down(),c("{",b,"}")},node:function(a){var b=s.jsDump.HTML?"&lt;":"<",c=s.jsDump.HTML?"&gt;":">",d=a.nodeName.toLowerCase(),e=b+d;for(var f in s.jsDump.DOMAttrs){var g=a[s.jsDump.DOMAttrs[f]];g&&(e+=" "+f+"="+s.jsDump.parse(g,"attribute"))}return e+c+b+"/"+d+c},functionArgs:function(a){var b=a.length;if(!b)return"";for(var c=Array(b);b--;)c[b]=String.fromCharCode(97+b);return" "+c.join(", ")+" "},key:a,functionCode:"[code]",attribute:a,string:a,date:a,regexp:b,number:b,"boolean":b},DOMAttrs:{id:"id",name:"name","class":"className"},HTML:!1,indentChar:"  ",multiline:!0};return f}(),s.diff=function(){function a(a,b){for(var c=new Object,d=new Object,e=0;e<b.length;e++)null==c[b[e]]&&(c[b[e]]={rows:new Array,o:null}),c[b[e]].rows.push(e);for(var e=0;e<a.length;e++)null==d[a[e]]&&(d[a[e]]={rows:new Array,n:null}),d[a[e]].rows.push(e);for(var e in c)1==c[e].rows.length&&"undefined"!=typeof d[e]&&1==d[e].rows.length&&(b[c[e].rows[0]]={text:b[c[e].rows[0]],row:d[e].rows[0]},a[d[e].rows[0]]={text:a[d[e].rows[0]],row:c[e].rows[0]});for(var e=0;e<b.length-1;e++)null!=b[e].text&&null==b[e+1].text&&b[e].row+1<a.length&&null==a[b[e].row+1].text&&b[e+1]==a[b[e].row+1]&&(b[e+1]={text:b[e+1],row:b[e].row+1},a[b[e].row+1]={text:a[b[e].row+1],row:e+1});for(var e=b.length-1;e>0;e--)null!=b[e].text&&null==b[e-1].text&&b[e].row>0&&null==a[b[e].row-1].text&&b[e-1]==a[b[e].row-1]&&(b[e-1]={text:b[e-1],row:b[e].row-1},a[b[e].row-1]={text:a[b[e].row-1],row:e-1});return{o:a,n:b}}return function(b,c){b=b.replace(/\s+$/,""),c=c.replace(/\s+$/,"");var d=a(""==b?[]:b.split(/\s+/),""==c?[]:c.split(/\s+/)),e="",f=b.match(/\s+/g);null==f?f=[" "]:f.push(" ");var g=c.match(/\s+/g);if(null==g?g=[" "]:g.push(" "),0==d.n.length)for(var h=0;h<d.o.length;h++)e+="<del>"+d.o[h]+f[h]+"</del>";else{if(null==d.n[0].text)for(c=0;c<d.o.length&&null==d.o[c].text;c++)e+="<del>"+d.o[c]+f[c]+"</del>";for(var h=0;h<d.n.length;h++)if(null==d.n[h].text)e+="<ins>"+d.n[h]+g[h]+"</ins>";else{var i="";for(c=d.n[h].row+1;c<d.o.length&&null==d.o[c].text;c++)i+="<del>"+d.o[c]+f[c]+"</del>";e+=" "+d.n[h].text+g[h]+i}}return e}}()}(this);