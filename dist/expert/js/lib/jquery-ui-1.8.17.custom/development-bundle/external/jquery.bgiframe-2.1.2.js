/*
*
* PHYLO Distribution Build v3.1.0
* http://phylo.cs.mcgill.ca
*
* Copyright 2013 McGill university, Alfred Kam, Jerome Waldispuhl and other contributors
* Under McGill Human-Computing Developer Licence
* https://github.com/McGill-CSB/PHYLO/blob/master/McGill-LICENCE.txt
*
*/!function(a){function b(a){return a&&a.constructor===Number?a+"px":a}a.fn.bgiframe=a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(c){c=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:!0,src:"javascript:false;"},c);var d='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+c.src+'"style="display:block;position:absolute;z-index:-1;'+(c.opacity!==!1?"filter:Alpha(Opacity='0');":"")+"top:"+("auto"==c.top?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(c.top))+";left:"+("auto"==c.left?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(c.left))+";width:"+("auto"==c.width?"expression(this.parentNode.offsetWidth+'px')":b(c.width))+";height:"+("auto"==c.height?"expression(this.parentNode.offsetHeight+'px')":b(c.height))+';"/>';return this.each(function(){0===a(this).children("iframe.bgiframe").length&&this.insertBefore(document.createElement(d),this.firstChild)})}:function(){return this},a.fn.bgIframe=a.fn.bgiframe}(jQuery);