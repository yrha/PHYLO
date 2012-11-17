/*
Developed By: Alfred Kam (www.cs.mcgill.ca/~akam2/), McGill MCB
Supervisors: Jerome Waldispuhl and Matthew Blanchette, McGill University
Type: Desktop / Tablet / Mobile Browser Edition
Supported Platforms: Android, iPod, iPhone, iPad, Chrome, Safari, FireFox
About: A McGill Phylo Project - Menu Control

Copyright Alfred Kam and McGill MCB

Version 0.5.0.1
Last Updated Sept 2011
*/

var DEV = true;
window.language = [["English","en"],
	//	["Spanish","sp"],
		["French", "fr"]];

(function() {
	//shared Components
	(function() {
		function g() {}
		//href attr table, options { "className" : ""};
		g.prototype.href = function(attr,opts) {
			var content="";
			for(var i=0;i<attr.length;i++) {
				content += "<a ";
				if(opts.className != null) 
					content += "class='"+opts.className+"' ";
				//content+= "href='http://"+window.location.hostname+window.location.pathname+"?pid="+attr[i][1]+"' id='"+attr[i][1]+"'>"+attr[i][0]+"</a>";
				content+= "href='#' id='"+attr[i][1]+"'>"+attr[i][0]+"</a>";
			}
			return content;
		};
		//get location hash value
		g.prototype.hash = function() {
			return window.location.hash;
		};
		
		//page is a page value
		g.prototype.requestPage = function(page,opts) {
				if(page == "play") {	
					return;
				}
				var url = "../content/"+this.GET("lang")+"/"+page+".html";	
				var f = this;
				f.fetchedPage[page] = "";
				$.post(url,function(data) {
					//$(".phylo-content").html(data);
					f.fetchedPage[page] = data;
					if(opts.last == true) {
						opts.start();	
					}
				});
		};

		//loading is set
		g.prototype.loadingOffSet = false;

		//page is a page value
		g.prototype.changePage = function(page) {
			page = page.replace(/#/,"");
			this.page = page;
			if(page == "play") {
				$("#sandbox").html("");
				var doc = document,
					win = window;
				animate.sleep();
			} else {
				$("#sandbox").css( {
					"left":"",
					"position":""
				});
				$("#sandbox").html("<div class='phylo-body'><div class='phylo-content'></div></div>");	
				if(this.fetchedPage[page] == "") {
					loading.install();
					this.loadingOffSet = true;
					window.setTimeout(function() { mcb.changePage(page);},100);	
					return;
				}
				if(this.loadingOffSet == true) {
					loading.uninstall();
					this.loadingOffSet = false;
				}
				if(this.fetchedPage[page] == undefined) {
					if(common.checkDevice() == "other" ^ common.checkDevice() =="ipad")
						$(".phylo-content").html("Oops! You arrived at a page that doesnt exist!"); 
				} else
					$(".phylo-content").html(this.fetchedPage[page]);
				footer.adjust(page);
			}	
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

		g.prototype.cookie = {
			create : function(name,value,days) {
					if (days) {
						var date = new Date();
						date.setTime(date.getTime()+(days*24*60*60*1000));
						var expires = "; expires="+date.toGMTString();
					} else var expires = "";
					document.cookie = name+"="+value+expires+"; path=/";
				},
			read : function(name) {
					var nameEQ = name + "=";
					var ca = document.cookie.split(';');
					for(var i=0;i < ca.length;i++) {
						var c = ca[i];
						while (c.charAt(0)==' ') c = c.substring(1,c.length);
						if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
					}
				return null;
			},
			erase : function(name) {
				mcb.cookie.create(name,"",-1);	
			}	
		};

		g.prototype.ext = {
					
		};

		g.prototype.data = function(code) {
			$.post("../s/index.php", { ip : window.ip, page : window.location.hash.replace(/#/,""), lang : mcb.GET("lang"), "code": code});
		};

		g.prototype.history = function() {
			var f = this;
			window.onhashchange = function() {
				mcb.data("0");
				setTimeout(function() {
					var loc = window.location.hash;
					if(loc.search(f.page) < 1) {
					//	console.log(loc + "<>"+f.page);
						if(loc.search(/play/) > -1)
							mcb.changePage("play");
						else
							mcb.changePage(loc);
					}
				},0);
			};	
			window.onbeforeunload = function() {
				mcb.data("1");
			};
		};


		g.prototype.progressBar = function() {
			var f = this;
			var doc = document,
				win = window;
			var data = "<div class='meter-wrap'><div class='meter-value' style='background-color: #0a0; width: 0%;'><div class='meter-text'>loading...</div></div></div>";
			this.fetchedPage = new Array();

			var div = doc.createElement("div");
			div.id = 'progress';
			doc.body.appendChild(div);
			$("#progress").html(data);
			/*
			$("#progress").click(function() {
				for(var i=0;i<=100;i++) {
					$(".meter-value").css("width",i+"%");
					$(".meter-text").html(i+"%");
				}
			}); */
			
		};

		g.prototype.addProgress = function(value) {
			var html = $(".meter-text").html();
			if(html == "loading...") {
				$(".meter-value").css("width",value+"%");
				$(".meter-text").html(value+"%");
			} else {
				html = parseInt(html.replace(/%/,""));
				$(".meter-value").css("width",(html+value)+"%");
				$(".meter-text").html((html+value)+"%");
			}
		};

		g.prototype.killProgress = function() {
			$("#progress").hide();
		};

	
		g.prototype.preFetch = function(href,init) {
			//this.progressBar();
			loading.install();
			var load = 100 / href.length;
			this.fetchedPage = new Array();
			for(var i=0;i<href.length;i++) {
				if(i == href.length-1) {
					this.requestPage(href[i][1],{last: true, start: init.start});
				} else {
					this.requestPage(href[i][1],{last: false});
				}
			//	this.addProgress(load);	
			}
			loading.uninstall();
			//this.killProgress();
			
		};

		var proto = g.prototype,
			attr = [["href",proto.href],
				["hash",proto.hash],
				["requestPage",proto.requestPage],
				["GET",proto.GET],
				["cookie",proto.cookie],
				["ext",proto.ext],
				["history",proto.history],
				["changePage", proto.changePage],
				["data",proto.data],
				["progressBar",proto.progressBar],
				["addProgress",proto.addProgress],
				["killProgress",proto.killProgress],
				["preFetch", proto.preFetch]
				];
		common.exportSingleton("mcb",g,attr);
	})();

	//tablet theme
	(function() {
		function g() {};
		//sets up the tablet menu + initiate events
		g.prototype.theme = function() {
			$(".menu").removeClass("menu");
			$(".nav").removeClass("nav");
			$("#menu").addClass("tabletMenu");
			$("#menu").children().each(function() {
				$(this).addClass("tabletNav");
			});
			$("#log").removeClass("tabletNav");
			$("#log").css("fontSize","150%");
			//theming it
			var href = window.setHref;
			for(var i=0;i<href.length;i++) {
				var color = (i < window.color.length)?window.color[i]:window.color[i-window.color.length]; 	
				$("#"+href[i][1]).html("<pre class='tabletNavBorder' style='background-color:"+color+"'></pre><p class='tabletNavContent'>"+href[i][0]+"</p>");
				$("#"+href[i][1]).mouseover(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					pre.style.backgroundColor = "";
				});
				$("#"+href[i][1]).mouseout(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					pre.style.backgroundColor = p.style.backgroundColor;
					p.style.backgroundColor = "";
				});
				$("#"+href[i][1]).click(function() {
				//	window.location.search = "?pid="+this.id;
					window.location.hash = this.id;
					mcb.changePage(this.id);
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					if(pre.style.backgroundColor == "") {
						//restores the rest of the color
						$("nav").children().each(function() {
							if(this.id != "tools") {
								var d = document.getElementById(this.id);
								var npre = d.getElementsByTagName("pre")[0];
								var np = d.getElementsByTagName("p")[0];	
								if(npre.style.backgroundColor == "") {
									npre.style.backgroundColor = np.style.backgroundColor;
									np.style.backgroundColor = "";	
									$(this).mouseover(function() {
										np.style.backgroundColor = npre.style.backgroundColor;
										npre.style.backgroundColor = "";					
									});
									$(this).mouseout(function() {
										npre.style.backgroundColor = np.style.backgroundColor;
										np.style.backgroundColor = "";
									});
								}
							}
						});	
						$(this).unbind("mouseover");
						$(this).unbind("mouseout");
						//now set the color
						p.style.backgroundColor = pre.style.backgroundColor;
						pre.style.backgroundColor = "";
					}
				}); 
				
			}	
		};

		g.prototype.adjust = function(prev) {
			var f = this;
			if(window.innerWidth > window.innerHeight && prev == true ^ prev == undefined) {
				$(".tabletMenu").css("width",window.innerWidth+"px");
				prev = false;
				$("#log").css("right","2em");
			} else if(window.innerHeight > window.innerWidth && prev == false  ^ prev == undefined){
				$(".tabletMenu").css("width",window.innerWidth+"px");
				prev = true;
				$("#log").css("right",".2em");	
			}
			window.setTimeout(function() {
				f.adjust(prev);
			},1000);		
		};

		//checks for hash to initialize specific page
		g.prototype.hasIncident = function() {
			var hash = mcb.hash();
			for(var i=0;i<window.setHref.length;i++)
				if(hash.match(window.setHref[i][1])) {
					var x = window.setHref[i][1];
					$("#"+x).unbind("mouseover");
					$("#"+x).unbind("mouseout");
					var pre = document.getElementById(x).getElementsByTagName("pre")[0];
					var p = document.getElementById(x).getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					pre.style.backgroundColor = "";
					if(x=="play") {
						$(".footNote").hide();
					}
					mcb.changePage(x);
					return;	
				}
		};
		
		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("tablet",g,attr);
	})();



	//desktop theme
	(function() {
		function g() {};
		//sets up the desktop menu + initiate events
		g.prototype.theme = function() {
			$("#log").addClass("desktopLog");
			//theming it
			var href = window.setHref;
			for(var i=0;i<href.length;i++) {
				var color = (i < window.color.length)?window.color[i]:window.color[i-window.color.length]; 	
				$("#"+href[i][1]).html("<pre class='navBorder' style='background-color:"+color+"'></pre><p class='navContent'>"+href[i][0]+"</p>");
				$("#"+href[i][1]).mouseover(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					pre.style.backgroundColor = "";
				});
				$("#"+href[i][1]).mouseout(function() {
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					pre.style.backgroundColor = p.style.backgroundColor;
					p.style.backgroundColor = "";
				});
				$("#"+href[i][1]).click(function() {
				//	window.location.search = "?pid="+this.id;
					window.location.hash = this.id;
					mcb.changePage(this.id);
					var div = document.getElementById(this.id);
					var pre = div.getElementsByTagName("pre")[0];
					var p = div.getElementsByTagName("p")[0];
					if(pre.style.backgroundColor == "") {
						//restores the rest of the color
						$("nav").children().each(function() {
							if(this.id != "tools") {
								var d = document.getElementById(this.id);
								var npre = d.getElementsByTagName("pre")[0];
								var np = d.getElementsByTagName("p")[0];	
								if(npre.style.backgroundColor == "") {
									npre.style.backgroundColor = np.style.backgroundColor;
									np.style.backgroundColor = "";	
									$(this).mouseover(function() {
										np.style.backgroundColor = npre.style.backgroundColor;
										npre.style.backgroundColor = "";					
									});
									$(this).mouseout(function() {
										npre.style.backgroundColor = np.style.backgroundColor;
										np.style.backgroundColor = "";
									});
								}
							}
						});	
						$(this).unbind("mouseover");
						$(this).unbind("mouseout");
						//now set the color
						p.style.backgroundColor = pre.style.backgroundColor;
						pre.style.backgroundColor = "";
					}
				}); 
				
			}

		};

		//checks for hash to initialize specific page
		g.prototype.hasIncident = function() {
			var hash = mcb.hash();
			for(var i=0;i<window.setHref.length;i++)
				if(hash.match(window.setHref[i][1])) {
					var x = window.setHref[i][1];
					$("#"+x).unbind("mouseover");
					$("#"+x).unbind("mouseout");
					var pre = document.getElementById(x).getElementsByTagName("pre")[0];
					var p = document.getElementById(x).getElementsByTagName("p")[0];
					p.style.backgroundColor = pre.style.backgroundColor;
					pre.style.backgroundColor = "";
					if(x=="play") {
						$(".footNote").hide();
					}
					mcb.changePage(x);
					return;	
				}
		};
		
		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("desktop",g,attr);
	})();
    
	//mobile theme
	(function() {
		function g() { };
		//themes the mobile and set up all the events
		g.prototype.theme = function() {
			
			//remove all desktop menu stuff
			$("#"+window.setHref[0][1]).remove();
			window.setHref.shift();						
			$("#tools").remove();
			$(".menu").removeClass("menu");
			$(".nav").removeClass("nav");
			
			//set up desktop menu stuff
			$("#menu").addClass("mobMenu");
			$("#menu").children().each(function() {
				$(this).addClass("mobNav");
			});

			//set some extra back navigation for mobile 
			var doc = document;
			var div = doc.createElement("div");
			var f = this;
			div.id ="mobBack";
			div.style.display = "none";
			doc.body.appendChild(div);
			$("#mobBack").html("<a href='#' id='back'>Back</a>");

			$("#mobBack").click(function() {
				$("#sandbox").html("");
				$("#menu").show("fast");
				footer.adjust("mobileMenu");
				f.adjust();
				$("#mobBack").hide();
				window.location.hash = "";
			});

			//set up the forward mobile navigation
			var href = window.setHref;
			for(var i=0;i<href.length;i++) {
				$("#"+href[i][1]).css("backgroundColor",window.color[i]);
				if(i%2 == 0)  { //even
					$("#"+href[i][1]).css("left", 0.4 + "em");
					if(i==0)
						$("#"+href[i][1]).css("top", 5+"em");
					else
						$("#"+href[i][1]).css("top", 3 + "em");
				} else {
					$("#"+href[i][1]).css("left",(1.4*3.3) + "em");
					if(i==1) 
						$("#"+href[i][1]).css("top",  3.15 +"em");
					else
						$("#"+href[i][1]).css("top",  1.15 +"em");
				}
				$("#"+href[i][1]).click(function() {
					$("#mobBack").show();
					$("#menu").hide();
					mcb.changePage(this.id);
					window.location.hash = this.id;
				});
			}	

			$("#menu").append("<img src='http://phylo.alfredkam.com/img/logo.png' class='mobImg'/>");
			$(".mobImg").css("left","2em");
			this.landscape = false;
			this.adjust();
		};
		//adjust the poition of the screen for portrait and landscape
		g.prototype.adjust = function() {
			var f = this;
			var href = window.setHref;
			if(window.innerWidth > window.innerHeight) {
				if(this.landscape == false) { 
					for(var i=0;i<href.length;i++)
						if(i%2 == 0)
							$("#"+href[i][1]).css("left", 4 + "em");
						else
							$("#"+href[i][1]).css("left", (2.5*3.3)+"em");
					$(".mobImg").css("left","9em");
					this.landscape = true;
				}
			} else {
				if(this.landscape == true) {
					for(var i=0;i<href.length;i++)
						if(i%2 == 0)
							$("#"+href[i][1]).css("left", 0.4 + "em");
						else
							$("#"+href[i][1]).css("left", (1.4*3.3)+"em");
					$(".mobImg").css("left","2em");
					this.landscape = false;
				}
			}
			if($("#sandbox").html() == "" || document.getElementById("menu").style.display == "") {
				window.setTimeout(function(){f.adjust();},1000);
			}
		};

		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("mobile",g,attr);
	})();
	//thmeing for footer
	(function() {
		function g() {}
		g.prototype.theme = function(doc,win) {
			var f = doc.createElement("footer");
			f.id = "footer";
			doc.body.appendChild(f);
			$("#footer").html("<p class='footNote' style='padding-bottom: 2em;'> &#169; <a href='http://www.mcgill.ca/mcb/'>McGill MCB</a> & <a href='http://www.alfredkam.com'>Alfred Kam</a><br><span style='font-size:0.6em'>**Phylo (non-flash) is currently a beta release</span></p>");

			if(window.location.pathname.search(/mini/) > -1)
				$("#miniNote").hide();

			$("#notWork").click(function() {
				window.location = "http://phylo.alfredkam.com/mini";
			});	
		};
		//adjust the footer depending on portrait or landscape
		g.prototype.adjust = function(page,opts) {
			if(page == "play") {
				if(common.checkDevice() != "other") {
					$("#footer").hide();
					return;
				}
				var gs = opts.gs;
				$("#footer").show();
				$("#footer").css({
					"position" : "absolute",
					"top" : (gs.yPx*gs.yMargin+(gs.y+2.0)*gs.yPx)
				});
			} else if(page == "menu") {
				$("#footer").css({
					"position":"relative",
					"top" : (parseInt($("#menu").css("top"))+1) + "em"
				});
			} else if(page == "mobileMenu") {
				$("#footer").css({
					"position":"absolute",
					"top" : "18em"
				});
			} else {
			
			/*	$("#footer").css({
					"position":"relative",
					"top" : "2em"
				}); */
				
				$("#footer").hide();	
				$(".phylo-body").append("<footer id='#phylo-footer'>"+$("#footer").html()+"</footer>");
				$("#phylo-footer").css({
						"position" :"relative",	
						"top" : "2em"
				});

			}
			/*
			if(common.checkDevice() != "other" && common.checkDevice() != "ipad")
				$("#footer").show();
			*/
		};

		var proto = g.prototype,
			attr = [["theme",proto.theme],
				["adjust", proto.adjust]];
		common.exportSingleton("footer",g,attr);
		
	})();

	//language selection...
	(function() {
		function g() {}
		g.prototype.theme = function(doc,win) {
			
			var arr = window.language;

			var content = "";
			for( var i=0;i<arr.length;i++)
				if(mcb.GET("lang") == arr[i][1])
					content += "<option selected='selected' value='"+arr[i][1]+"'>"+arr[i][0]+"</option>";
				else
					content += "<option value='"+arr[i][1]+"'>"+arr[i][0]+"</option>";
			
			$("#tools").append("<select class='lang' id='langopt'>"+content+"</selected>");	

			if(common.checkDevice() == "other") { //desktop
				$("#langopt").css({
					"left": "80%",
					"top" : "-2.85em"
				});
			} else { //ipads
				$("#langopt").css( {
					"left" : "77%",
					"top": "-2.4em"
				});
				$("#log").css("top","-.2em");
			}
	
			$("#langopt").change(function() {
				$("#langopt option:selected").each(function() {
					mcb.cookie.erase("phyloLang");
					mcb.cookie.create("phyloLang",$(this).val(),360);
					win.location.search = "?lang="+$(this).val();
				//win.location.hash;
				});		
			});
		};

		var proto = g.prototype,
			attr = [["theme",proto.theme]];
		common.exportSingleton("lang",g,attr);
	})();

	//initiate the interface
	(function() {
		var config = {
			desktop : function(doc,win) {
				window.option = true;
				footer.theme(doc,win);
				desktop.theme();
				footer.adjust("menu");
				desktop.hasIncident();
				lang.theme(doc,win);
				try {
					login.init();	
				} catch (err) {
					console.log("Login Code Broke");
					console.log(err);
				}
			},
			ipad :  function(doc,win) {
				window.option = true;	
				footer.theme(doc,win);
				tablet.theme();
				footer.adjust("menu");
				tablet.hasIncident();
				lang.theme(doc,win);
				tablet.adjust();
				try {
					login.init();	
				} catch (err) {
					console.log("Login Code Broke");
					console.log(err);
				}
			},
			mobile : function(doc,win) {
				window.option = false;		
				footer.theme(doc,win);
				mobile.theme();
				footer.adjust("mobileMenu");
			},
			nokia : function(doc,win) {
				window.option = false;
				mobile.theme();
			}
		};

		$(document).ready(function() {
			//settings
			if(mcb.GET("lang") == undefined) {
				if(mcb.cookie.read("phyloLang") == null) {
					if(common.checkDevice() == "ipad" ^ common.checkDevice() == "other") {
						window.location = "http://phylo.alfredkam.com/new/splash.html"+window.location.hash;
						return;
					} else {
						mcb.cookie.create("phyloLang","en",360);
						window.location.search = "?lang=en"+window.location.hash;	
					}
				} else {
					mcb.cookie.create("phyloLang",mcb.cookie.read("phyloLang",360));
					window.location.search = "?lang="+mcb.cookie.read("phyloLang")+window.location.hash;
				}
			} else {
				var lang = window.language;
				var isLang = false;
				for(var i=0;i<lang.length;i++)
					if(lang[i][1] == mcb.GET("lang"))
						isLang = true;
				if(!isLang) {
					window.location = "http://phylo.alfredkam.com/new/splash.html"+window.location.hash;
					return;
				}
				if(mcb.cookie.read("phyloLang") == null) {
					mcb.cookie.create("phyloLang",mcb.GET("lang"),360);
					//window.location.search = "?lang="mcb.GET("lang")+window.location.hash;	
				}
			}
			if(common.checkDevice() == "other" ^ common.checkDevice() == "ipad")
				if(mcb.hash() == "")
					window.location.hash = "#home";

			mcb.history();	
			mcb.data("0");
			//some settings
			window.setHref = [["Home","home"],
						["Play","play"],
						["About","about"],
						["FAQ","faq"],
						["Contact","contact"]];
			//for gmail style instant loading :)

			var init = {
				start : function() {
					window.color = ["cyan","darkOrchid","green","orange"];
					var doc = document,
						win = window;
					var nav = doc.createElement("nav");
					nav.id = "menu";
					nav.className = "menu";
					doc.body.appendChild(nav);
					var div = doc.createElement("div");
					div.id = "sandbox";
					doc.body.appendChild(div);
					var content = mcb.href(win.setHref,{ "className" : "nav" });
					content += "<div id='tools'><a href='#' id='log'>Log In</a></div>"; 
					
					$("#menu").html(content);
					
				//	config.ipad(doc,win);
						
					if(common.checkDevice() == "ipad")
						config.ipad(doc,win);
					else if(common.checkDevice() == "other")  
						config.desktop(doc,win);
					else if(common.checkDevice() == "qt") 
						config.nokia(doc,win);
					else 
						config.mobile(doc,win);
				 
				}
			};
			mcb.preFetch(window.setHref,init);
		});
	})();
})();


(function() {
	function g(){}
	g.prototype.lightbox = function(msg,opts) {
		$(document).ready(function() {
			var doc = document, win = window;
			if(document.getElementById("warning-lightbox") == undefined) {
				var div = doc.createElement("div");
				div.id = "warning-lightbox";
				doc.body.appendChild(div);
			}
			$("#warning-lightbox").html("<div id='warning-lightbox-shadow'></div><div id='warning-lightbox-content'><div id='warning-lightbox-content-body'></div><div id='warning-lightbox-content-options'></div></div>");
			$("#warning-lightbox").css({
				"position" : "absolute",
				"top" : "0",
				"left" : "0",	
				"width" : "100%",
				"height" : "100%"
			});
			$("#warning-lightbox-shadow").css({ "position" : "absolute",
						"top": "0px",
						"left" :"0px",
						"width" : window.innerWidth,
						"height" : window.innerHeight,
						"background-color":"black",
						"opacity" : "0.8",
						"zIndex" : "200"
					});
			$("#warning-lightbox-content").css({
				"position" : "absolute",
				"top" : win.innerHeight*.21,
				"left" : win.innerWidth*.275,
				"height" : win.innerHeight*.25,
				"width" : win.innerWidth*.4,
				"zIndex":"201",
				"backgroundColor" : "#505050"
			});
			$("#warning-lightbox-content-body").css( {
				"position" : "relative",
				"text-align" : "center",
				"top" : "10%",
				"left" : "5%",
				"width" : "90%",
				"height" : "80%",
				"color" : "#FFFFFF"
			});
			$("#warning-lightbox-content-options").css({
				"position" : "relative",
				"left" : "5%",
				"width" : "90%"
			});
			$("#warning-lightbox-content-options").html("<a class='warning-opts' href='#' id='warning-okay'>Okay</a>");

			$("#warning-okay").click(function() {
				try {
					if(opts.okay != undefined)
						opts.okay();
				} catch(err) {}
				$("#warning-lightbox").remove();
			});
			$(".warning-opts").css({
				"float" : "left",
				"margin-left" : "5%",
				"padding" : "1px 1px 1px 1px",
				"position" : "relative",
				"left" : "40%",
				"backgroundColor" : "#000000"
			});

			try {
				if(opts.cancel != undefined) {
					$("#warning-lightbox-content-options").append("<a class='warning-opts' href='#' id='warning-cancel'>Cancel</a>");
					$("#warning-okay").css( {
						"left" : "25%"
					});
					$("#warning-cancel").css( {
						"float" : "left",
						"left" : "30%",
						"margin-left": "40%",
						"backgroundColor" : "#000000",
						"padding" : "1px 1px 1px 1px"
					});
					$("#warning-cancel").click(function() {
						opts.cancel();
						$("#warning-lightbox").html("");
					});
				}
			} catch(err) {}
			$("#warning-lightbox-content-body").html(msg);
		});
	};
	var proto = g.prototype,
		attr = [["lightbox",proto.lightbox]];
	common.exportSingleton("bug",g,attr);
})();
//usage
// if want to append on click
// options ::: { "cancel" : fn() , "okay" : fn() }
//bug.lightbox("alert test, press okay to continue",{"cancel" : function() { console.log("workeD"); } } );
//bug.lightbox("alert test, press okay to continue");

//loading installation //
(function() {
	function g() { this.im = new Image(); this.im.src = "http://phylo.alfredkam.com/img/loading15.gif"; this.im.id = "loading-gif" }
	g.prototype.install = function() {
		var im = this.im;		
		if(document.getElementById("loading") == undefined) {
			var div = document.createElement("div");
			div.id = "loading";
			document.body.appendChild(div);
		}
		$("#loading").html("<div id='loading-box'></div>");
		document.getElementById("loading").appendChild(im);
		$("#loading-gif").css({
			"position" : "absolute",
			"height" : "40px",	
			"width" : "200px",
			"top" : (window.innerHeight-40)/2,
			"left" : (window.innerWidth-200)/2,
			"zIndex" : "250"
		});
		$("#loading-box").css({
			"position" : "absolute",
			"height" : window.innerHeight,
			"width" : window.innerWidth,
			"background-color" : "#000000",
			"opacity" : "0.8",
			"zIndex" : "249",
			"top" :0,
			"left": 0
		});
	};
	g.prototype.uninstall = function() {
		$("#loading").html("");
	};
	var proto =g.prototype,
		attr = [["install",proto.install],
			["uninstall",proto.uninstall]];
		common.exportSingleton("loading",g,attr);
})();

