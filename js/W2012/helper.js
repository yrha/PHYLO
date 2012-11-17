	(function() {
		function g() {}
		g.prototype.exportSingleton = function(name, obj, attr) {
			if(!window[name]) {
				var g = window[name] = new obj;
				for(var i=0;i<attr.length;i++) {
					try {
					g[attr[i][0]] = attr[i][1];
					} catch(err) {
					}
				}
			}
		};
		g.prototype.setHash = function(hash) {
			window.location.hash = hash;
			this.currentHash = hash;
		};	


		g.prototype.history = function(content, doc, win, ac, lang) {
			var f = this;
			/*
			$(window).hashchange(function() {
				console.log(location.hash);
			});*/
			/*
			window.onhashchange = function() {
				console.log("asD");
				window.setTimeout(function() {
					console.log(f.getHash());
					if(f.getHash() == "" ^ f.getHash() == undefined) {
						f.setHash(f.currentHash);	
					} else {
						if(f.currentHash != f.getHash()) {
							ga.setPage(content, doc, win, ac, lang);
						}	
					}
				},0);
			};*/
		};
		g.prototype.GET = function(pid) {
			var $_GET = {};

			document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
			    function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
				}

			    $_GET[decode(arguments[1])] = decode(arguments[2]);
			});

			return $_GET[pid];	
		};

		g.prototype.getHash = function(hash) {
			return window.location.hash.replace(/#/,"");
		};	
		g.prototype.setHTTP = function(x) {
			window.location.search = "?lang=en&page=dashboard&dash="+x;
		};
		
		g.prototype.getHTTP = function() {
			return fn.GET("dash"); 
		};
		var proto = g.prototype,
			attr = [
				["setHash",proto.setHash],
				["getHash",proto.getHash],
				["exportSingleton",proto.exportSingleton]
				];
		proto.exportSingleton("fn", g, attr);
	})();
	(function() {
		String.prototype.urlEncode = function() {
			return encodeURIComponent(this);
		};
		String.prototype.urlDecode = function() {
			return decodeURIComponent(this);
		}
		String.prototype.filter = function() {
			return this.replace(/\\"/g,"");
		};
		String.prototype.json = function() {
			return eval("["+this+"]")[0];
		};
		String.prototype.removeTime = function() {
			return this.replace(/\s.*$/,"");
		};
		String.prototype.trim = function() {
			return $.trim(this);
		};

		$.scrollUp = function () {
			try {
				$("body").animate({
					scrollTop : 0// 125
				});
			} catch(err) {
				$("body").scrollTop(0);
			}
		};
		$.clearWarning = function() {
			$(".register-warning").html("").hide();
			$("#content-ga-rightPanel input").each(function() {
				$(this).removeClass("bug");
				$(this).val("");
			});
		};
		
		var stringify = JSON.stringify || function (obj) {
			var t = typeof (obj);
			if (t != "object" || obj === null) {
				// simple data type
				if (t == "string") obj = '"'+obj+'"';
				return String(obj);
			}
			else {
			// recurse array or object
				var n, v, json = [], arr = (obj && obj.constructor == Array);
				for (n in obj) {
				    v = obj[n]; t = typeof(v);
				    if (t == "string") v = '"'+v+'"';
				    else if (t == "object" && v !== null) v = JSON.stringify(v);
				    json.push((arr ? "" : '"' + n + '":') + String(v));
				}
				return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
			}
		};	
		$.stringify = function(x){ return stringify(x); };

		$.invalid = {
			level : function() {
				$("#notify-wrapper").css({
					width : window.innerWidth,
				});
				$("#notify-bg").css({
					width : $(document).width(),
					height : $(document).height(),
				});
				
				$("#notify-b").html("Please enter a valid level!");		
				$("#notify").fadeIn("fast");		
			},
			box : function (str) {
				$("#notify-wrapper").css({
					width : window.innerWidth,
				});
				$("#notify-bg").css({
					width : $(document).width(),
					height : $(document).height(),
				});
				
				$("#notify-b").html(str);		
				$("#notify").fadeIn("fast");		
			},
			event : function() {
				$("#notify-body a").attr("href","#"+window.langOpt);
				$("#notify-body a").click(function() { 
					$("#notify").fadeOut("fast");
				});
			}, 
			browser : function() {
			}
			
		}
		$(document).ready(function() {
			$.invalid.event();
			$.invalid.browser();
		});
	})();
