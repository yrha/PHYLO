/*
*
* PHYLO Distribution Build v3.1.0
* http://phylo.cs.mcgill.ca
*
* Copyright 2013 McGill university, Alfred Kam, Jerome Waldispuhl and other contributors
* Under McGill Human-Computing Developer Licence
* https://github.com/McGill-CSB/PHYLO/blob/master/McGill-LICENCE.txt
*
*/!function(a){a.effects.bounce=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"up",g=b.options.distance||20,h=b.options.times||5,i=b.duration||250;/show|hide/.test(e)&&d.push("opacity"),a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j="up"==f||"down"==f?"top":"left",k="up"==f||"left"==f?"pos":"neg",g=b.options.distance||("top"==j?c.outerHeight({margin:!0})/3:c.outerWidth({margin:!0})/3);if("show"==e&&c.css("opacity",0).css(j,"pos"==k?-g:g),"hide"==e&&(g/=2*h),"hide"!=e&&h--,"show"==e){var l={opacity:1};l[j]=("pos"==k?"+=":"-=")+g,c.animate(l,i/2,b.options.easing),g/=2,h--}for(var m=0;h>m;m++){var n={},o={};n[j]=("pos"==k?"-=":"+=")+g,o[j]=("pos"==k?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(o,i/2,b.options.easing),g="hide"==e?2*g:g/2}if("hide"==e){var l={opacity:0};l[j]=("pos"==k?"-=":"+=")+g,c.animate(l,i/2,b.options.easing,function(){c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}else{var n={},o={};n[j]=("pos"==k?"-=":"+=")+g,o[j]=("pos"==k?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(o,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()}),c.dequeue()})}}(jQuery);