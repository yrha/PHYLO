/*
*
* PHYLO Distribution Build v3.1.0
* http://phylo.cs.mcgill.ca
*
* Copyright 2013 McGill university, Alfred Kam, Jerome Waldispuhl and other contributors
* Under McGill Human-Computing Developer Licence
* https://github.com/McGill-CSB/PHYLO/blob/master/McGill-LICENCE.txt
*
*/!function(a){a.effects.explode=function(b){return this.queue(function(){var c=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,d=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode="toggle"==b.options.mode?a(this).is(":visible")?"hide":"show":b.options.mode;var e=a(this).show().css("visibility","hidden"),f=e.offset();f.top-=parseInt(e.css("marginTop"),10)||0,f.left-=parseInt(e.css("marginLeft"),10)||0;for(var g=e.outerWidth(!0),h=e.outerHeight(!0),i=0;c>i;i++)for(var j=0;d>j;j++)e.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(g/d),top:-i*(h/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/d,height:h/c,left:f.left+j*(g/d)+("show"==b.options.mode?(j-Math.floor(d/2))*(g/d):0),top:f.top+i*(h/c)+("show"==b.options.mode?(i-Math.floor(c/2))*(h/c):0),opacity:"show"==b.options.mode?0:1}).animate({left:f.left+j*(g/d)+("show"==b.options.mode?0:(j-Math.floor(d/2))*(g/d)),top:f.top+i*(h/c)+("show"==b.options.mode?0:(i-Math.floor(c/2))*(h/c)),opacity:"show"==b.options.mode?1:0},b.duration||500);setTimeout(function(){"show"==b.options.mode?e.css({visibility:"visible"}):e.css({visibility:"visible"}).hide(),b.callback&&b.callback.apply(e[0]),e.dequeue(),a("div.ui-effects-explode").remove()},b.duration||500)})}}(jQuery);