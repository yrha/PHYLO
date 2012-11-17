(function() {
	function a() {}
	//short hand
	function $(a) { return document.getElementById(a); }
	//event listener
	a.prototype.listen = function(e, event, handler) {
		if(e.addEventListener) { //chrome , firefox ...etc
			e.addEventListener(event,handler,false);
			return;
		} 
		if(e.attachEvent) {  //windows...
			e.attachEvent("on"+event,handler);
			return;
		}
		//old browsers
		var oldHandler = e ["on"+event];
		e["on"+event] = function(c) {
			c = (c)?c:window.event;
			var result = handler(c);
			return (oldHandler!= undefined)
				&& (oldHandler(c) == true) 
				&& (result == true);
		};
	};
	//remove event listener
	a.prototype.removeListen  = function(e,handler) {
		if(e.removeEventListener) {
			e.removeEventListener(handler,false);
			return;
		}
	};
	//filters out the stuff 
	a.prototype.filter = function(a) {
		a = a.replace(/px$/,"");
		a = a.replace(/^#/,"");
		return a;
	};
	//capatitalize the first character
	a.prototype.cap = function(a) {
		if(a == "faq") return "FAQ";	
		else
		return a.charAt(0).toUpperCase() + a.slice(1);
	};
	//export for use with other class
	a.prototype.exportSingleton = function(name, obj, attr) {
		if(!window[name]) {
			var g = window[name] = new obj;
			for(var i=0;i<attr.length;i++) {
				g[attr[i][0]] = attr[i][1];
			}
		}
	};
	//dump information on the browser
	a.prototype.dump = function(str) {
		if($("dump") != null) {
			$("dump").innerHTML = str;
		} else {
			var div = document.createElement("div");
			div.id = "dump";
			document.body.appendChild(div);
			$("dump").style.zIndex = "100";
			$("dump").style.position = "absolute";
			$("dump").style.right = "0px";
			$("dump").innerHTML = str;
			$("dump").style.border = "dotted";
		}
	};
	//alert box (lightbox)
	a.prototype.alert = function(msg,yesHandeler,noHandler) {
		var doc = document,
			win = window;
		if($("alertBox") == undefined) {
			var ab = doc.createElement("div");
			ab.id = "alertBox";
			doc.body.appendChild(ab);
			//desktop browser settings
			$("alertBox").style.height = "50px";
			$("alertBox").style.width = "100px";
			$("alertBox").style.top = (win.innerHeight/2-25) + "px";
			$("alertBox").style.left = (win.innerWidth/2-50) + "px"; 
			$("alertBox").style.border = "dotted";
			$("alertBox").innerHTML = "<div id='alertBoxContent'></div><div id='alertBoxButtons'><label id='alertBoxOk'>Ok</label><label id='alertBoxCancel'>Cancel</label></div>";
			$("alertBoxOk").style.border = "dotted";
			$("alertBoxCancel").style.border = "dotted";
			this.listen($("alertBoxOk"),"click",yesHandeler);
			this.listen($("alertBoxCancel"),"click",nohHandeler);
		} else {
			$("alertBox").style.display = "";
		}
		$("alertBoxContent").innerHTML = msg;
	}
	//returns a random name /*to be finish*/
	a.prototype.nameFrame = function() {
		return "random"; 			
	};
	//generates IFRAME
	a.prototype.makeFrame = function(name,url) {
		var doc = document;
		var f = doc.createElement("iframe");
		f.id = name;
		f.name = name;
		f.src = url;
		doc.body.appendChild(f);	
		$(name).height = "0";
		$(name).width = "0";
		$(name).style.displau = "none";
	};
	//checks for devices and return device type
	a.prototype.checkDevice = function() {
		var device = ["miui","iphone","ipod","series60","symbian","andriod","windows ce","blackberry","palm","ipad"];
		var uagent = navigator.userAgent.toLowerCase();


		if(this.set != null)
			return this.set;
		
		if(uagent.search("qt") >-1) {
			this.set = "qt";
			return "qt";
		}

		if(uagent.search("andriod 3.") > -1)
		{
			this.set = "ipad";
			return "ipad";
		}

		if(uagent.search("android") > -1)
		{
			this.set = "android";
			return "android";
		}


		for(var i=0;i<device.length;i++) {
			if(uagent.search("webkit") > -1 && uagent.search(device[i]) > -1) {
				this.set = device[i];
				return device[i];
			}
		}
		this.set = "other";
		return "other";
	};

	a.prototype.getNoReply = function(url) {
		 var xmlHttp = function() {
			 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
			 if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
			  for (var i=0; i<activexmodes.length; i++){
			   try{
			    return new ActiveXObject(activexmodes[i]);
			   }
			   catch(e){
			    //suppress error
			   }
			  }
		 }
		 else if (window.XMLHttpRequest) // if Mozilla, Safari etc
		  return new XMLHttpRequest();
		 else
		  return false;
		}	

		var request = new xmlHttp;
		request.onreadystatechange = function() {
			if(request.readyState == 4) {
				
			}
		};
		request.open("GET",url,true);
		request.send(null);
	};

	/* extension api */
	a.prototype.addExtension = function(name, handler) {	

	};
	a.prototype.getEvent = function(e) {

	};
	a.prototype.checkOrientation = function() {
		
	};
	var proto = a.prototype,
		attr = [["listen",proto.listen],
			["exportSingleton",proto.exportSingleton],
			["dump",proto.dump],
			["checkDevice",proto.checkDevice],
			["makeFrame",proto.makeFrame],
			["nameFrame",proto.nameFrame],
			["filter",proto.filter],
			["cap",proto.cap],
			["removeListen",proto.removeListen],
			["addExtension",proto.addExtenion],
			["getNoReply",proto.getNoReply]];
	a.prototype.exportSingleton("common",a,attr);
})();
	
