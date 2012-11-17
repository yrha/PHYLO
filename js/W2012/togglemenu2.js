var toggleMenu = {

    init : function(sContainerClass, sHiddenClass) {
	if (!document.getElementById || !document.createTextNode) {return;} // Check for DOM support
	var arrMenus = this.getElementsByClassName(document, 'ul', sContainerClass);
	var arrSubMenus, oSubMenu, oLink;
	for (var i = 0; i < arrMenus.length; i++) {
	    arrSubMenus = arrMenus[i].getElementsByTagName('ul');
	    for (var j = 0; j < arrSubMenus.length; j++) {
		oSubMenu = arrSubMenus[j];
		oLink = oSubMenu.parentNode.getElementsByTagName('a')[0];
		oLink.onclick = function(){
                    toggleMenu.clean(sContainerClass, sHiddenClass);
                    toggleMenu.show(this.parentNode.getElementsByTagName('ul')[0], sHiddenClass);
                    return false;
                }
		this.hide(oSubMenu, sHiddenClass);
	    }
	}
    },

    clean : function(sContainerClass, sHiddenClass) {
	if (!document.getElementById || !document.createTextNode) {return;} // Check for DOM support
	var arrMenus = this.getElementsByClassName(document, 'ul', sContainerClass);
	var arrSubMenus, oSubMenu, oLink;
	for (var i = 0; i < arrMenus.length; i++) {
	    arrSubMenus = arrMenus[i].getElementsByTagName('ul');
	    for (var j = 0; j < arrSubMenus.length; j++) {
		oSubMenu = arrSubMenus[j];
		this.hide(oSubMenu, sHiddenClass);
	    }
	}
    },

    /* show/hide class functions */

    toggle : function(el, sHiddenClass) {
	var oRegExp = new RegExp("(^|\\s)" + sHiddenClass + "(\\s|$)");
	el.className = (oRegExp.test(el.className)) ? el.className.replace(oRegExp, '') : el.className + ' ' + sHiddenClass; // Add or remove the class name that hides the element
    },
    
    hide : function(el, sHiddenClass) {
        var oRegExp = new RegExp("(^|\\s)" + sHiddenClass + "(\\s|$)");
        if (!(oRegExp.test(el.className))) {
            el.className = el.className + ' ' + sHiddenClass; // Hides the element
        }
    },
    
    show : function(el, sHiddenClass) {
	var oRegExp = new RegExp("(^|\\s)" + sHiddenClass + "(\\s|$)");
        el.className = el.className.replace(oRegExp, '');
    },
    
    /* addEvent function from http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html */
    addEvent : function(obj, type, fn) {
	if (obj.addEventListener)
	    obj.addEventListener(type, fn, false);
	else if (obj.attachEvent) {
	    obj["e"+type+fn] = fn;
	    obj[type+fn] = function() {obj["e"+type+fn](window.event);}
	    obj.attachEvent("on"+type, obj[type+fn]);
	}
    },

    getElementsByClassName : function(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
	    oElement = arrElements[i];      
	    if(oRegExp.test(oElement.className)){
		arrReturnElements.push(oElement);
	    }   
	}
	return (arrReturnElements)
    }
};
toggleMenu.addEvent(window, 'load', function(){toggleMenu.init('menu','hidden');});
