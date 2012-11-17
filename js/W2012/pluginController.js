/*
Developed By: Alfred Kam (www.cs.mcgill.ca/~akam2/), McGill MCB
Supervisors: Jerome Waldispuhl and Mathieu Blanchette, McGill University
Type: Desktop / Mobile Browser Edition
Supported Platforms: Android, iPod, iPhone, iPad, Chrome, Safari, FireFox
About: A McGill Phylo Project, phylo game plugin sys...

Copyright Alfred Kam and McGill MCB

Version: 0.0.0.3
Last Updated Oct 2011

Fixes:::
version: 0.0.0.3
Change phylo -> mcb
Merge mcb components
Added New compoments

version: 0.0.0.2
Fixed compatibility issue with paperjs

*/
//plug in controller
(function() {	
	function g() {
		this.type = ["init","menu","gameStart","gameMenu","onMoveStart","onMoveStop","gameEnd"];	
		this.tracker = [];
		this.stage = "";
		this.gameSetting = "";
		this.win = "";
		this.checkDevice = common.checkDevice;	
		this.addScript = function(href) {
			var doc = document;
			var script = doc.createElement("script");
			script.src = href;
			script.type = "text/javascript";
			doc.body.appendChild(script);
		};
		this.addCSS = function(href) {
			var doc = document;
			var script = doc.createElement("script");
			script.href = href;
			script.rel = "stylesheet";
			doc.body.appendChild(script);
		};
		this.body = {
			html : function(str) {
				$("#sandbox").html("<div class='phylo-body'>"+str+"</div>");
			},
			append : function(str) {
				$(".phylo-body").append(str);
			}
		};
		
		this.deviceType = common.checkDevice();
		if(this.deviceType == "other")
			this.deviceType = "desktop";
		else if (this.deviceType == "ipad")
			this.deviceType = "tablet";
		else 
			this.deviceType = "mobile";
	}
	//a container to push
	var plugins = function() {
		var f = this;
		this.name = [];
		this.returnName = function() {
			return this.name;
		};
		this.arr = [];
		this.add = function(name,x) {
			f.arr.push(x);
			f.name.push(name);
		};
		this.runOnce = function(name) {
			var i = this.name.indexOf(name);
			try {
				f.arr[i].run();
			} catch (err) {
				console.log("Error > Executing Plugin " +f.name[i]);
			}
		};
		this.run =function() {
			for(var i=0;i<f.arr.length;i++) 
				try {
					f.arr[i].run();
				} catch (err) {
					console.log("Error > Executing Plugin " +f.name[i]);
				}
		};
	}
	//initalize when js excutes by init.js 
	g.prototype.pre = function() {
		var tracker = this.tracker;
		var type = this.type,	
			fn = this.fn;
		var len = type.length;
		var device = common.checkDevice();
		if(device == "other")
			device = "desktop";
		else if(device == "ipad")
			device = "tablet";
		else
			device = "mobile";
		
		while(len--) {
			tracker.push(new plugins);
		}

		for(var i in fn) {
			try {
				var x = fn[i].type.toString();
				var d = fn[i].device.toString();
				if( d.search(device) < 0) {
					continue;
				}
				x = x.split(",");
				for(name in x) {
					var space = $.trim(x[name]);
					var k = type.indexOf(space);
					if(k > -1) {
						tracker[k].add(i,fn[i]);
					} else {
						console.log("Error > Plugin "+ i +" thrown type '"+space+"' not exist");	
					} 
					
				}
			} catch(err) {
				console.log("Error > Dealing with plugin " +i+"\n Please check device and type are defined");
			}
		}		
	};
	//gets called when hit checkpoints
	g.prototype.run = function(value) {
		try {
			if(value == "pre-menu") {
				var list = this.tracker[this.type.indexOf("menu")].returnName();
				var name = "", i ="";
				if (list.length == 0)
					return;
				for(i in list) {
					name = list[i].substr(0,1).toUpperCase()+list[i].substr(1);
					window.setHref.push([name,list[i]]);
				}
			} else if(value == "post-menu") {
				var name = "";
				var index = this.type.indexOf("menu");
				var list = this.tracker[index].returnName();
				var f = this;
				if (list.length == 0)
					return;
				for(name in list) {
					$("#"+list[name]).click(function() {
						f.tracker[index].runOnce(list[name]);
					});
				}	
			} else if(value == "gameMenu") {
				var list = this.tracker[this.type.indexOf("gameMenu")].returnName();
				if(list.length == 0)
					return;

				var runList = this.tracker[this.type.indexOf("gameMenu")].arr;
				for (item in list) {
					var name = runList[item].name.toString().split(",");
					for(var i=0;i<name.length;i++)
						name[i] = $.trim(name[i]);
					name.push(runList[item].run);
					window.gameMenuArray.push(name);
				}
					
			} else 
				this.tracker[this.type.indexOf(value)].run();
		} catch (err) {
			console.log("Plugin Controller Error @"+value+" > " +err);
		}
	};
	g.prototype.fn = {};	
	g.prototype.setgs = function(gs){
		this.gameSetting = gs;
	};
	g.prototype.setStage = function(stage) {
		this.stage = stage; //int
	};
	g.prototype.setWinLoose = function(win) {
		this.win = win; //boolean
	};
//	g.prototype.checkDevice = common.checkDevice();

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
			if(page == "play" ^ page == "home") {	
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
			}).error(function() {
				f.fetchedPage[page] = "<span style='font-size:2em;color:red;'>Oops!</span><br>This page does not exist yet, please check again later!<br>If you create this page, please add content/&#60;language&#62;/"+page+".html";
				if(opts.last == true) {
					opts.start();	
				}
			});
	};

	//loading is set
	g.prototype.loadingOffSet = false;

	//page is a page value
	g.prototype.changePage = function(page) {
		page = page.replace(/#/,"").toLowerCase();
		this.page = page;
		console.log(page);
	
		if(common.checkDevice() != "other" && common.checkDevice() != "ipad")
			if(page.search(/play/) > -1) {
				if(gameID.check())
					return;
				
			}
		


		if(page ==  "play" ^ page == "home") {
			$("#sandbox").html("");
			var doc = document,
				win = window;
			animate.sleep();
			try {
			$("#footer").show();
			} catch(err) { console.log("Error > footer went missing weee...");}
		} else if(page =="menu") {
			try {
			$("#footer").show();
			} catch(err) { console.log("Error > footer went missing weee...");}
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
					$(".phylo-content").html("<span style='font-size:2em;color:red;'>Oops!</span><br>This page does not exist!<br>Are trying to look up something??? But we forgive you for helping us compute alignments"); 
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
	g.prototype.body = {
		html : function(value) {
			if(value == undefined) {
				return $("#sandbox").html();
			} else {
				$("#sandbox").html(value);
			}
		},
		append : function(value) {
			if(value == undefined) {
				console.log("Error > value for body append is undefined"); 
			} else
				$("#sandbox").append(value);
		}
	}
	var proto = g.prototype,
	attr = [["fn",proto.fn],
		["init",proto.pre],
		["run",proto.run],
		["setgs",proto.setgs],
		["setStage", proto.setStage],
		["setWinLoose",proto.setWinLoose],
		["href",proto.href],
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
