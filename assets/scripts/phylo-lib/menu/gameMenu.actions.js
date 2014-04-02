/* old script will phase out */

(function() {
	//config 
	(function() {
		function g() {}
		g.prototype.desktopSettings = {
			width: function() {
				return 1024;
			},
			height: function() {
				return 450;
			},
			numberOfSequence: 10,
			sequenceLength: 25,
			box: function() {
				var x = this.boxWidth() / this.sequenceLength;
				var y = this.boxHeight() / this.numberOfSequence;
				if (x < y)
					return x;
				else
					return y;
			},
			boxLeft: function() {
				return this.width() / 5;
			},
			boxWidth: function() {
				return this.width() / 5 * 4;
			},
			boxHeight: function() {
				return 400;
			},
			color: ["rgb(113, 178, 226)", "rgb(153, 50, 204)", "rgb(0, 128, 0)", "rgb(255, 165, 0)"],
		};

		g.prototype.determineSettings = function() {
			return this.desktopSettings;
		};

		var proto = g.prototype,
			attr = [
				["sequence", proto.sequence],
				["desktopSettings", proto.desktopSettings]
			];
		common.exportSingleton("config", g, attr);
	})();
	//initalize for both desktop and tablet
	(function() {
		function a() {}
		a.prototype.background = function(settings) {
			var data = "<div id='background'>";
			for (var i = 0; i < settings.numberOfSequence; i++) {
				for (var j = 0; j < settings.sequenceLength; j++) {
					data += "<div class='bgBox' style='top:" + (i * settings.box()) + "px;left:" + (j * settings.box() + settings.boxLeft()) + "px;'></div>";
				}
			}
			$("#sandbox").append(data + "</div>");
			$(".bgBox").css({
				width: settings.box(),
				height: settings.box(),
			});
		};

		a.prototype.buildCube = function() {

		};

		var proto = a.prototype,
			attr = [
				["background", proto.background]
			];
		common.exportSingleton("generate", a, attr);

		String.prototype.trim = function() {
			return $.trim(this);
		};

		function init() {
			//initalizie sandbox
			var settings = config.determineSettings();
			$("#sandbox").css({
				"width": settings.width(),
				"height": settings.height()
			});
			generate.background(settings);
		}

	})();

	(function() {
		function g() {};
		g.prototype.start = function() {
			$("#sandbox").html("");
			var doc = document,
				win = window;
			var settings = config.determineSettings();
			this.loadBackground(doc, win, settings);
			$("#sandbox").css({
				width: settings.width(),
				height: settings.height()
			});
			//this.loadStroke(doc,win,settings);
			this.loadMenu(doc, win, settings);
			this.listenToReload();
			/* temp fix */
		};
		g.prototype.restart = function() {
			var doc = document,
				win = window;
			var settings = config.determineSettings();
			this.loadMenu(doc, win, settings);
		};
		g.prototype.loadBackground = function(doc, win, settings) {

			var canvas = doc.createElement('canvas');
			var sandbox = doc.getElementById("sandbox");
			canvas.id = 'draw';
			canvas.style.position = "absolute";
			canvas.style.zIndex = 2;
			canvas.style.top = 0;
			canvas.style.left = 0;
			canvas.width = settings.width();
			canvas.height = settings.height();

			sandbox.appendChild(canvas);
			NProgress.done();
		};
		g.prototype.resetMenuSound = function(){

			if ($.cookie.read("music-level")) {
				try {
					var volume = $.cookie.read("music-level");
					document.getElementById("menuSound").volume = volume;
				} catch (err) {}
			}
		};
		//depreciated
		/* but its a cool way to start a game */
		/*
		g.prototype.loadStroke = function(doc,win,settings) {
			var ctx = doc.getElementById('draw').getContext('2d');
			var selection = [];

			var f = this;
			var stroke = function(ctx) {
				ctx.beginPath();
				ctx.fillStyle = "#E80000";
				ctx.fillRect(0,313,1024,25);
				ctx.fillStyle = "rgb(113, 178, 226)";
				var x = 170;
				var y = 300;
				ctx.fillRect(170,300,200,50);
				ctx.font = "20pt Helvetica";
				ctx.fillStyle = "white";
				ctx.fillText("Slide To Play",190,335);
				ctx.closePath();
				var offset = 0;
				this.onOver = function(eX,eY) {
					
				};
				this.offset = 0;
				this.onMouseDown = function(eX,eY) {
					if( x <= eX && eX <= x+200 &&
						y <= eY && eY <= y+50) {
						if(offset == 0 ) 
							offset = eX-x;
						if(eX-offset > 0 && 824 > eX-offset) {
							ctx.beginPath();
							ctx.fillStyle = "#E80000";
							ctx.clearRect(x,300,200,50);
							ctx.fillRect(x,313,200,25);
							ctx.fillStyle = "rgb(113, 178, 226)";
							ctx.fillRect(eX-offset,300,200,50);
							ctx.font = "20pt Helvetica";
							ctx.fillStyle = "white";
							ctx.fillText("Slide To Play",eX-offset+20,335);
							x = eX-offset;
							if( x > 500) {
								//start menu
								$('#draw').unbind("mouseup");
								$('#draw').unbind("mousedown");
								$('#draw').unbind("mousemove");
								f.loadMenu(doc,win,settings);
							}
						}
						ctx.closePath();
					} else {

					}
				};
				this.onUnbind = function() {
					offset = 0;
				}
			};
			f.loadMenu(doc,win,settings);
			
			selection.push(new stroke(ctx));

			$('#draw').mousedown(function(e) {
				$('#draw').mousemove(function(e) {
					var k = getCursorPosition(e);
					for(var i=0;i<selection.length;i++) {
						selection[i].onMouseDown(k[0],k[1]);		
					}
				});
			});
			$('#draw').mouseup(function(e){
				$('#draw').unbind("mousemove");
				for(var i=0;i<selection.length;i++) {
					selection[i].onUnbind();		
				}
			});
		}; */

		g.prototype.loadMenu = function(doc, win, settings) {
			var f = this;
			$("#splashLogo").remove();
			var ctx = doc.getElementById('draw').getContext('2d');
			this.resetMenuSound();

			ctx.beginPath();
			ctx.globalAlpha = 1;
			ctx.clearRect(0, 0, settings.width(), settings.height());

			var banner = new Image();
			var bannerValues = {
				x: 200,
				y: 20,
				w: 600,
				h: 160

			}
			banner.onload = function() {
				ctx.drawImage(banner, bannerValues.x, bannerValues.y, bannerValues.w, bannerValues.h);
			};
		
			// banner.src = 'assets/img/phylo.png';
			banner.src = 'assets/img/logo.png';
			ctx.fillStyle = "#F1F1F1";
			ctx.fillRect(212, 250, 600, 120);

			var motto = window.lang.header.moto||"";
			ctx.font ="19pt Helvetica";
			ctx.textAlign = "center";
			ctx.fillStyle = "#000";
			ctx.fillText(motto, 512, 220);

			ctx.closePath();
			var selection = [];
			var menuStr = [window.lang.body.play.gameselect.levelselect.random["field 2"], window.lang.body.play.gameselect.levelselect["level id"]["field 2"], window.lang.body.play.gameselect.levelselect.disease["field 1"]];

			var menuIcon = [
				["assets/img/random.png", 95, 95],
				["assets/img/id.png", 95, 95],
				["assets/img/disease.png", 95, 95],
			];
			var menuIconHover = ["assets/img/random_hover.png", "assets/img/id_hover.png", "assets/img/disease_hover.png"]
			//var menuBar = [
			var cell = function(ctx, x, y, i) {
				var menuStrColor = '#444';
				ctx.beginPath();
				ctx.fillStyle = settings.color[i];
				var icon = new Image();
				icon.onload = function() {
					ctx.drawImage(icon, x, y, menuIcon[i][1], menuIcon[i][2]);
				}
				icon.src = menuIcon[i][0];
				ctx.fillStyle = menuStrColor;
				ctx.font = "19pt Helvetica";
				//ctx.fillText(menuStr[i],x+100,y+25);
				ctx.closePath();
				var iconOnHover = false;
				this.onOver = function(eX, eY) {
					ctx.beginPath();
					if (x <= eX && eX <= x + menuIcon[i][1] &&
						y <= eY && eY <= y + menuIcon[i][2]) {
						if (iconOnHover == false && window.isTablet == false) {
							ctx.clearRect(x, y, menuIcon[i][1], menuIcon[i][2])
							ctx.fillStyle = "#F1F1F1";
							ctx.fillRect(x, y, menuIcon[i][1], menuIcon[i][2]);
							var icon = new Image();
							icon.onload = function() {
								ctx.drawImage(icon, x, y, menuIcon[i][1], menuIcon[i][2]);
							}
							icon.src = menuIconHover[i];
							ctx.fillStyle = "#6D6D6D";
							ctx.font = "19pt Helvetica";
							ctx.textAlign = "center";
							ctx.fillText(menuStr[i], 515, 420);
							iconOnHover = true;
						}
					} else {
						if (iconOnHover) {
							ctx.fillStyle = "#F1F1F1";
							ctx.fillRect(x, y, menuIcon[i][1], menuIcon[i][2]);
							var icon = new Image();
							icon.onload = function() {
								ctx.drawImage(icon, x, y, menuIcon[i][1], menuIcon[i][2]);
							}
							icon.src = menuIcon[i][0];
							iconOnHover = false;
							ctx.clearRect(0, 390, 1024, 50);
						}
					}
					ctx.closePath();
				};
				this.onClick = function(eX, eY) {
					var menuStrColor = '#444';
					if (x <= eX && eX <= x + menuIcon[i][1] &&
						y <= eY && eY <= y + menuIcon[i][2]) {
						// console.log("clicked");
						// document.getElementById("menuSound").play();
						switch (i) {
							case 1:
								ctx.beginPath();
								ctx.clearRect(0, 0, 1024, 450);
								ctx.closePath();
								selection = [];
								ctx.beginPath();
								ctx.fillStyle = menuStrColor;
								ctx.font = "20pt Helvetica";
								ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 3"], 490, 100);
								ctx.closePath();
								selection.push(new levelselect(ctx));
								window.setTimeout(function() {
									selection.push(new back(ctx));
								}, 50);
								return;
							case 2:
								var diseaseorder = [];

								var imageCache = {};
								for (var imgs in diseaseImages) {
									imageCache[imgs] = {};
									imageCache[imgs].normal = $("#svg-" + imgs)[0];
									imageCache[imgs].hover = $("#svg-" + imgs + "-hover")[0];
								}
								// console.log(imageCache);
								$.ajax({
									url: "/phpdb/openPhyloClassicDB.php",
									dataType: "json",
									async: false
								}).done(function(data) {
									for (var x in diseaseImages) {
										if (data[x]) {
											diseaseorder.push({
												name: x,
												data: data[x],
												image: imageCache[x],
												localName: lang.body.play.gameselect.levelselect.disease[x] || x
											});
										} else {
											diseaseorder.push({
												name: x,
												data: [],
												image: imageCache[x],
												localName: lang.body.play.gameselect.levelselect.disease[x] || x
											});
										}
									}
									// diseaseorder = data;
									// console.log("data added in!");
								});
								ctx.beginPath();
								ctx.textAlign = "center";
								ctx.clearRect(0, 0, 1024, 450);
								ctx.fillStyle = menuStrColor;
								ctx.font = "20pt Helvetica";
								ctx.fillText(lang.body.play.gameselect.levelselect.disease["field 1"], settings.width() / 2, 100);
								ctx.textAlign = "left";
								ctx.closePath();
								selection = [];
								window.setTimeout(function() {
									console.log(diseaseorder);
									for (var j = 0; j < diseaseorder.length && j < 8; j++) {
										// if (diseaseList[diseaseorder[j].name].length == 0)
										// selection.push(new emptyDisease(ctx, diseaseorder[j], j))d
										// else
										if (diseaseorder[j].data.length == 0) {
											selection.push(new emptyDisease(ctx, diseaseorder[j], j));
										} else {
											selection.push(new disease(ctx, diseaseorder[j], j));
										}
									}
								}, 50);
								selection.push(new back(ctx));
								return;
							case 0:
								ctx.beginPath();
								ctx.textAlign = "center";
								ctx.clearRect(0, 0, 1024, 450);
								ctx.fillStyle = menuStrColor;
								ctx.font = "20pt Helvetica";
								ctx.fillText(lang.body.play.gameselect.levelselect.random["field 1"], settings.width() / 2 + 60, 120);
								ctx.fillText(lang.body.play.gameselect.levelselect.random["field 3"], settings.width() / 2 + 60, 240);
								ctx.textAlign = "left";
								ctx.closePath();
								selection = [];
								var k = 0;
								for (var j = 3; j <= 10; j += 2) {
									selection.push(new random(ctx, j, k));
									k += 1;
								}
								window.setTimeout(function() {
									selection.push(new back(ctx));
								}, 50);
								return;
						}
					}
				};
				var diseaseImages = {
					// "Digestive": "assets/img/disease/digestive.png",
					"Heart": "assets/img/disease/heart.svg",
					"Cancer": "assets/img/disease/cancer.svg",
					"Metabolic": "assets/img/disease/metabolic.svg",
					"Digestive": "assets/img/disease/lung.svg",

					"Blood": "assets/img/disease/blood.svg",
					// "Sensory": "assets/img/disease/sensory.svg", 
					"Brain": "assets/img/disease/brain.svg",
					// "Muscles": "assets/img/disease/muscles.svg", 
					// "Lung": "assets/img/disease/lung.svg",
					"Infectious": "assets/img/disease/infectious.svg",
					//"Mental": "assets/img/disease/mental.svg",
					"Misc": "assets/img/disease/misc.svg"

				};

				//caching by drawing it inside a canvas
				//so it can get retrieved later on
				if($("#svgPreload").children().length==0){
					for(var toPreload in diseaseImages){
						var preLoadCan = document.createElement('canvas');
						var preLoadCanHover = document.createElement('canvas');
						preLoadCan.setAttribute("id","svg-"+toPreload);
						preLoadCanHover.setAttribute("id","svg-"+toPreload+"-hover");

						var preloadCtx = preLoadCan.getContext('2d');
						preloadCtx.drawSvg(diseaseImages[toPreload],0,0,70,70);
						// preLoadCtx.close();
						var preloadHoverCtx = preLoadCanHover.getContext('2d');
						preloadHoverCtx.drawSvg(diseaseImages[toPreload].replace(".svg","_hover.svg"),0,0,70,70);
						$("#svgPreload").append(preLoadCan);
						$("#svgPreload").append(preLoadCanHover);
					}
				}
			}


			var levelselect = function(ctx) {
				var menuStrColor = '#444';
				$("#level_inputbox").show();
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = "rgb(153,50,204)";
				ctx.fillRect(405, 220, 170, 50);
				ctx.fillStyle = menuStrColor;
				ctx.font = '19pt Helvetica';
				ctx.textAlign = "center";
				ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 4"], 490, 252);
				ctx.textAlign = "left";
				ctx.restore();
				ctx.closePath();
				this.onClick = function(eX, eY) {
					if (405 < eX && eX < 525 &&
						220 < eY && eY < 270) {
						// document.getElementById("menuSound").play();

						var id = parseInt($("#level_inputbox").val().trim());
						if (isNaN(id)) {
							$.helper.popUp("Numbers Only!", function(status) {

							}, {
								cancel: false,
							});
							return;
						}
						$.ajax({
							url: "../phpdb/phyloExpertDB.php",
							data: "mode=2&id=" + id,
							type: "POST",
						}).done(function(data) {
							if (data == "") {
								//$.invalid.level();
								// $.helper.popUp("Invalid level!", function(status) {

								// }, {
								// 	cancel: false,
								// });
								bootbox.alert(window.lang.body.misc.invalidPuzzle);

							} else {
								$("#draw").hide();
								$("#menu").hide();
								$("#level_inputbox").hide();
								$("#level_inputbox").val("");
								$.main.init({
									type: "disease",
									num: id,
								});
							}
							return;
						}).fail(function(data) {
							$("#draw").hide();
							$("#menu").hide();
							$("#level_in/putbox").hide();
							$("#level_inputbox").val("");
							$.main.init({
								type: "disease",
								num: id,
							});

						});
					}
				};
				this.onOver = function(eX, eY) {
					ctx.beginPath();
					ctx.save();
					if (405 < eX && eX < 525 &&
						220 < eY && eY < 270) {

						ctx.fillStyle = "#6D6D6D";
						ctx.fillRect(405, 220, 170, 50);
						ctx.fillStyle = "white";
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 4"], 490, 252);
						ctx.textAlign = "left";
					} else {
						ctx.fillStyle = "rgb(153,50,204)";
						ctx.fillRect(405, 220, 170, 50);
						ctx.fillStyle = "white";
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.body.play.gameselect.levelselect["level id"]["field 4"], 490, 252);
						ctx.textAlign = "left";

					}
					ctx.restore();
					ctx.closePath();
				};
			};

			var emptyDisease = function(ctx, items, i) {
				var hovered = false;
				// var img = new Image();
				// if (!items.image) {
				// 	items.image = "assets/img/disease/misc.png"
				// }
				var img = items.image.normal;
				//img.onload = function() {
					ctx.beginPath();
					ctx.globalAlpha = 0.5;
					ctx.drawImage(img, 300 + 110 * (i > 3 ? i - 4 : i), i > 3 ? 235 : 125);
					//ctx.fillText("test",300+110*(i>3?i-4:i),i>3?315:205);

					ctx.globalAlpha = 1;
					ctx.closePath();
				//};
				this.onClick = function(eX, eY) {};
				this.onOver = function(eX, eY) {
					if (300 + 110 * (i > 3 ? i - 4 : i) < eX && eX < 370 + 110 * (i > 3 ? i - 4 : i) && (i > 3 ? 235 : 125) < eY && eY < (i > 3 ? 330 : 220)) {
						ctx.clearRect(200, 330, 650, 40);

						ctx.font = '16pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(items.localName, 500, 360);
						hovered = true;
						//ctx.fillText(items.localName,335+110*(i>3?i-4:i),i>3?325:215);						hovered = true;
					} else {
						if (hovered) {
							ctx.clearRect(200, 330, 650, 40);
							hovered = false;
						}
					}
				};
			};

			var disease = function(ctx, items, i) {
				//var img = new Image();
				//var img_hover = new Image();
				//no image case
				// if (!items.image) {
				// 	items.image = "assets/img/disease/misc.svg"
				// }
				var img= items.image.normal;
				var img_hover = items.image.hover;
				var hovered = false;
				//img.onload = function() {
					ctx.beginPath();
					ctx.globalAlpha = 1;
					//ctx.drawImage(img, 335+110*(i>=4?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
					//ctx.drawImage(img, 335+110*(i>=4?(i>=6?i-6:i-3):i), 150+(i>=3?(i>=6?200:100):0), 70, 70);
					ctx.drawImage(img, 300 + 110 * (i > 3 ? i - 4 : i), i > 3 ? 235 : 125);


					ctx.closePath();
				//};
				this.onClick = function(eX, eY) {
					if (300 + 110 * (i > 3 ? i - 4 : i) < eX && eX < 370 + 110 * (i > 3 ? i - 4 : i) && (i > 3 ? 235 : 125) < eY && eY < (i > 3 ? 330 : 220)) {
						//var id = diseaseList[items.name][Math.floor(Math.random()*diseaseList[items.name].length)];
						document.getElementById("menuSound").play();

						var id = items.data[Math.floor(Math.random() * items.data.length)];
						$("#draw").hide();
						$("#menu").hide();
						// console.log(id);
						$.main.init({
							type: "disease",
							num: id,
						});
						return;
					}
				};
				this.onOver = function(eX, eY) {
					if (300 + 110 * (i > 3 ? i - 4 : i) < eX && eX < 370 + 110 * (i > 3 ? i - 4 : i) && (i > 3 ? 235 : 125) < eY && eY < (i > 3 ? 330 : 220)) {
						ctx.beginPath();
						ctx.clearRect(300 + 110 * (i > 3 ? i - 4 : i), i > 3 ? 235 : 125, 105, 105);
						//ctx.clearRect(200,i>3?310:200,650,21);
						ctx.clearRect(200, 330, 650, 40);
						ctx.drawImage(img_hover, 300 + 110 * (i > 3 ? i - 4 : i), i > 3 ? 235 : 125);
						ctx.closePath();

						ctx.font = '16pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(items.localName, 500, 360);
						hovered = true;
						//ctx.fillText(items.localName,335+110*(i>3?i-4:i),i>3?325:215);						hovered = true;
					} else {
						if (hovered) {
							ctx.beginPath();
							//ctx.clearRect(200,i>3?310:200,650,21);
							ctx.clearRect(200, 330, 650, 40);

							ctx.clearRect(300 + 110 * (i > 3 ? i - 4 : i), i > 3 ? 235 : 125, 105, 105);
							ctx.drawImage(img, 300 + 110 * (i > 3 ? i - 4 : i), i > 3 ? 235 : 125);
							//ctx.fillText("test",300+110*(i>3?i-4:i),i>3?315:205);

							ctx.closePath();
							hovered = false;
						}
					}
				};
			};

			var onHover = false;
			var random = function(ctx, i, k) {
				var color = ["rgb(113, 178, 226)", "rgb(153, 50, 204)", "rgb(0, 128, 0)", "rgb(255, 165, 0)"];
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = color[(k > 3 ? k - 4 : k)];
				ctx.fillRect(100 + 70 * i, 150, 100, 50);
				ctx.fillStyle = 'white';
				ctx.font = '19pt Helvetica';
				ctx.textAlign = "center";
				ctx.fillText(i + " - " + (i + 1), 150 + 70 * i, 185);
				ctx.restore();
				ctx.closePath();
				this.onOver = function(eX, eY) {
					if (100 + 70 * i < eX && eX < 200 + 70 * i &&
						150 < eY && eY < 200) {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "#6D6D6D";
						ctx.fillRect(100 + 70 * i, 150, 100, 50);
						ctx.fillStyle = 'white';
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(i + " - " + (i + 1), 150 + 70 * i, 185);
						ctx.restore();
						ctx.closePath();

					} else {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = color[(k > 3 ? k - 4 : k)];
						ctx.fillRect(100 + 70 * i, 150, 100, 50);
						ctx.fillStyle = 'white';
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(i + " - " + (i + 1), 150 + 70 * i, 185);
						ctx.restore();
						ctx.closePath();
					}
				};
				this.onClick = function(eX, eY) {
					if (100 + 70 * i < eX && eX < 200 + 70 * i &&
						150 < eY && eY < 200) {
						// document.getElementById("menuSound").play();

						var ranNumber = Math.floor(Math.random() * 2) + 1 - 1;
						$("#draw").hide();
						$("#menu").hide();
						console.log("calling random main ")
						$.main.init({
							type: "random",
							num: (i + ranNumber),
						});
						return;
					}
				};

			};

			var back = function(ctx) {
				ctx.beginPath();
				ctx.save();
				ctx.fillStyle = "#EF4136";
				ctx.fillRect(150, 120, 50, 110);
				ctx.fillStyle = 'white';
				ctx.rotate(1.56);
				ctx.font = '19pt Helvetica';
				ctx.textAlign = "center";
				ctx.fillText(lang.header["field 9"], 175, -165);
				ctx.textAlign = "left";
				ctx.restore();
				ctx.closePath();
				this.onOver = function(eX, eY) {
					if (150 < eX && eX < 200 &&
						120 < eY && eY < 230) {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "#6D6D6D";
						ctx.fillRect(150, 120, 50, 110);
						ctx.fillStyle = "white";
						ctx.rotate(1.56);
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.header["field 9"], 175, -165);
						ctx.textAlign = "left";
						ctx.restore();
						ctx.closePath();
					} else {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "#EF4136";
						ctx.fillRect(150, 120, 50, 110);
						ctx.fillStyle = 'white';
						ctx.rotate(1.56);
						ctx.font = '19pt Helvetica';
						ctx.textAlign = "center";
						ctx.fillText(lang.header["field 9"], 175, -165);
						ctx.textAlign = "left";
						ctx.restore();
						ctx.closePath();
					}

				};
				this.onClick = function(eX, eY) {
					if (150 < eX && eX < 200 &&
						120 < eY && eY < 230) {
						// document.getElementById("menuSound").play();

						ctx.beginPath();
						ctx.clearRect(0, 60, 1024, 400);
						ctx.closePath();
						selection = [];
						//selection.push(new highscore(ctx));
						for (var i = 0; i < 3; i++) {
							selection.push(new cell(ctx, 310 + (160 * i), 260, i));
						}
						var banner = new Image();
						banner.onload = function() {
							ctx.drawImage(banner, bannerValues.x, bannerValues.y, bannerValues.w, bannerValues.h);
						};
						$('#draw').mousemove(function(e) {
							var k = getCursorPosition(e);
							for (var i = 0; i < selection.length; i++) {
								selection[i].onOver(k[0], k[1]);
							}
						});
						banner.src = 'assets/img/logo.png';
						ctx.fillStyle = "#F1F1F1";
						ctx.fillRect(212, 250, 600, 120);

						var motto = window.lang.header.moto||"";
						ctx.font ="19pt Helvetica";
						ctx.textAlign = "center";
						ctx.fillStyle = "#000";
						ctx.fillText(motto, 512, 220);
						$("#level_inputbox").val("").hide();
					}
				};
			};

			for (var i = 0; i < 3; i++) {
				//selection.push(new cell(ctx,150,120+(50*i),i));
				selection.push(new cell(ctx, 310 + (160 * i), 260, i));
			}

			$('#draw').unbind().mousemove(function(e) {
				var k = getCursorPosition(e);
				for (var i = 0; i < selection.length; i++) {
					selection[i].onOver(k[0], k[1]);
				}
			}).click(function(e) {
				var k = getCursorPosition(e);
				for (var i = 0; i < selection.length; i++) {
					selection[i].onClick(k[0], k[1]);
				}
			});
		};

		g.prototype.listenToReload = function() {
			/*
			window.setInterval(function() {
				if(window.frames["frame"].window.location.hash.search(/reload/) > -1) {
					device.start();	
				}
			},1000); */
		};

		function getCursorPosition(e) {
			var gCanvasElement = document.getElementById("sandbox");
			var menu = document.getElementById("app-content");
			var x;
			var y;
			if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
			} else {
				x = e.clientX + document.body.scrollLeft +
					document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
					document.documentElement.scrollTop;
			}
			// Convert to coordinates relative to the canvas
			x -= gCanvasElement.offsetLeft;
			y -= menu.offsetTop;
			return [x, y]
		}

		var proto = g.prototype,
			attr = [
				["start", proto.start],
				["restart", proto.restart]
			];
		common.exportSingleton("interactiveMenu", g, attr);
	})();
})()