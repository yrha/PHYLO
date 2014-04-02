/* this scripts generates the board features */
(function() {
	//insert sound here
	//var lightUpSound = new Audio("assets/sounds/starLightUp.wav"); // buffers automatically when created
	//var starClickSound = new Audio("assets/sounds/startSound.wav");
	//moved the 2 lines to its respective function
	// var lighUpSound = document.getElementById("lightUpSound");
	// var starClickSound = document.getElementById("starClickSound");

	var doc = document,
		win = window;
	var musicList = [{
		name: "Valent - The Buckle",
		loc: "assets/sounds/Valent%20-%20The%20Buckle.mp3"
	}];
	$.board = {
		//generates the grid 
		build: function() {
			// var str = "";
			// for (var i = 0; i < $.phylo.rows; i++) {
			// 	str += "<div class='bgRow'>";
			// 	for (var j = 0; j < $.phylo.seqLen; j++) {
			// 		str += "<div class='bgCell' style='left:" + $.sequence.calcPos(j) + "px'></div>";
			// 		// str += "<div class='bgCell'></div>";
			// 	}
			// 	str += "</div>";
			// }
			//$("#gameBoard").html("<div id='bg'>" + str + "</div>");
			$("#gameBoard").html("<canvas width='827px' height='332px' id='canvasBG'></canvas>");
			this.redrawBG();
		},
		redrawBG : function() {
			var canvas = document.getElementById("canvasBG");
			var c = canvas.getContext("2d");
			c.globalAlpha = 1;
			c.clearRect(0,0,827,350);
			for(var i=0; i < $.phylo.seqLen + 1;i++) {
				c.beginPath();
				c.lineWidth = 2;
				c.moveTo($.sequence.calcPos(i)+1, 0);
				c.lineTo($.sequence.calcPos(i)+1, 350);
				c.strokeStyle = "#C4C4C4";
				c.stroke();	
				c.closePath();
			}
			for(var i=0; i < $.phylo.rows+1; i++) {
				c.beginPath();
				c.lineWidth = 2;
				c.moveTo(0, $.sequence.calcPos(i)+1);
				c.lineTo(827, $.sequence.calcPos(i)+1);
				c.strokeStyle = "#C4C4C4";
				c.stroke();	
				c.closePath();
			}
		},
		//updates and displays the score
		score: function(x) {
			$.phylo.currentScore = x;
			$("#userScore").html("Score: " + x);
			$.html5.score.setScore(x);
		},
		//updates and displays the best score
		bestScore: function(x) {
			$("#bestScore").html("Best: " + x);
			if ($.stage.current == $.stage.last) {
				if (x > $.sequence.par)
					$.protocal.sendHighScore();
			}
		},
		//displays the par
		par: function(x) {
			$("#parScore").html("Par: " + x);
		},
		//displays the current stats
		stats: function() {
			var ln = window.lang.body.play.gameselect["game board"];
			if ($.stage.stats == undefined)
				$("#statsPanel").html(ln["field 3"] + ": " + ($.stage.current + 1) + "/" + ($.stage.last + 1));
			else
				$("#statsPanel").html("<i class='icon-puzzle'></i> ID:&nbsp;&nbsp;" + $.phylo.id + "<br>" + ln["field 3"] + ": " + ($.stage.current + 1) + "/" + ($.stage.last + 1) + "<span class='gap'></span>" + ln["field 9"] + ": " + $.stage.stats.match + "<span class='gap'></span>" + ln["field 10"] + ": " + $.stage.stats.mismatch + "<span class='gap'></span>" + ln["field 11"] + ": " + $.stage.stats.open + "<span class='gap'></span>" + ln["field 12"] + ": " + $.stage.stats.extend + "<span class='gap'><span>" + ln["field 2"] + ": " + $.sequence.par);
		},
		//listens to events
		startListener: function() {
			var self = this;
			var starClickSound = document.getElementById("starClickSound");
			//disables background music
			if (window.DEV.disableMusic == false){

				$("#musicPlayerSpot").html("<audio loop='loop' id='game-audio' preload='auto' autobuffer style='display:none'><source src='assets/sounds/Valent%20-%20The%20Buckle.ogg' type='audio/ogg'/><source src='assets/sounds/Valent%20-%20The%20Buckle.mp3' type='audio/mp3'/>Your browser does not support audio element</audio>");
			}
			var sounds = ["#customize-music","#customize-countdown","#customize-redraw","#customize-star","#customize-fxOthers"];
			for(var i in sounds){
				$(sounds[i]).trigger("click");
				$(sounds[i]).trigger("click");

			}
			//disable this
			$("#scorePanel").hide();
			//volume control
			// $("#volume").on("click",function(){
			// 	$("#customize").trigger("click");
			// 	$("a.tag-music").trigger("click");
			// });
			/*$("#volumeOff").hide();
			//cookie for music
			if ($.cookie.read("music-level")) {
				try {
					var volume = $.cookie.read("music-level");
					document.getElementById("game-audio").volume = volume;
					document.getElementById("endGameSound").volume = volume;
					document.getElementById("redrawSound").volume = volume;

					lightUpSound.volume = volume;
					starClickSound.volume = volume;
					if (volume == 0) {
						$("#volumeOn").hide();
						$("#volumeOff").show();
					} else {
						$("#volumeOn").show();
						$("#volumeOff").hide();
					}
				} catch (err) {}
			}
			if (window.isMobile) {
				$("#volumeOn").hide();
				$("#volumeOff").hide();

			} else {
				$("#volumeOn").unbind().click(function() {
					$.cookie.create("music-level", 0, 365);
					document.getElementById("game-audio").volume = 0;
					lightUpSound.volume = 0;
					starClickSound.volume = 0;
					document.getElementById("endGameSound").volume = 0;
					document.getElementById("redrawSound").volume = 0;
					$("#volumeOn").hide();
					$("#volumeOff").show();
				});
				$("#volumeOff").unbind().click(function() {
					$.cookie.create("music-level", 1, 365);
					document.getElementById("game-audio").volume = 1;
					lightUpSound.volume = 1;
					starClickSound.volume = 1;
					document.getElementById("endGameSound").volume = 1;
					document.getElementById("redrawSound").volume = 1;
					$("#volumeOff").hide();
					$("#volumeOn").show()
				});
			}
			*/
			//roll back to best score
			$("#cycle").unbind().click(function() {
				$.helper.copy($.sequence.track, $.phylo.bestTrack);
				//$.sequence.track = $.phylo.bestTrack.slice(0);

				var score = $.fitch.score();
				$.board.score(score);
				$.physics.snapRandom();
				if ($.phylo.bestScore >= $.sequence.par)
					$.board.approve();
				self.stats();

			});
			if(DEBUG){
				console.log("bindings are done!");
			}
			$("#undo").unbind().click(function(){
				$("#moveListener").trigger("undoMove");
			});
			$("#redo").unbind().click(function(){
				$("#moveListener").trigger("redoMove");
			})
			//next stage
			$("#star").unbind().click(function() {
				starClickSound.play();
				if ($.phylo.currentScore >= $.sequence.par)
					$.stage.round();
			});
			//new scoring
			//$.html5.score.init();
		},
		//tinkers the css on the star
		approve: function() {
			var self = this;
			var lighUpSound = document.getElementById("lightUpSound");
			$("#star").addClass("pass");
			$("#star").animate({
				opacity: 1
			}, 300, function() {
				if ($.phylo.currentScore < $.sequence.par) {
					self.unapprove();
					return;
				}
				lightUpSound.play();
				$("#star").animate({
					opacity: 0.2
				}, 300, function() {
					if ($.phylo.currentScore < $.sequence.par) {
						self.unapprove();
						return;
					}
					$("#star").animate({
						opacity: 1
					}, 500, function() {
						if ($.phylo.currentScore < $.sequence.par) {
							self.unapprove();
							return;
						}
						$("#star").animate({
							opacity: 0.2
						}, 300, function() {
							if ($.phylo.currentScore < $.sequence.par) {
								self.unapprove();
								return;
							}
							$("#star").animate({
								opacity: 1
							}, 500, function() {
								if ($.phylo.currentScore < $.sequence.par) {
									self.unapprove();
									return;
								}
							});
						});
					});
				});
			});
		},
		//tinkers the css on the star 
		unapprove: function() {
			$("#star").removeClass("pass");
			$("#star").css({
				opacity: 0.4
			});
		},
		//builds json alignments of the current score (but its not json)
		getSubmissionAlignments: function() {
			var self = this;
			var track = $.sequence.track;
			var str = "[";
			for (var i = 0; i < track.length; i++) {
				str += '{"';
				for (var j = 0; j < track[i].length; j++) {
					if (track[i][j] == "x")
						str += "-";
					else if (i != 0 && track[i][j] == 0)
						str += "";
					else
						str += self.convertColor($("#" + track[i][j]));
				}
				str += '"}';
				if (i < track.length - 2)
					str += ',';
			}
			return '{"alignments" : ' + str + ']}';
		},
		//builds a json object of the current board
		getJsonAlignments : function(){
			var self = this;
			var track = $.extend(true,[],$.sequence.track);
			// var track = $.sequence.slice();
			// var arr = [];
			// for(var i =0; i<track.length;i++){
			// 	var str="";
			// 	for (var j = 0; j < track[i].length; j++) {
			// 		if (track[i][j] == "x")
			// 			str += "-";
			// 		else if (i != 0 && track[i][j] == 0)
			// 			str += "";
			// 		else
			// 			str += self.convertColor($("#" + track[i][j]));
			// 	}
			// 	arr[i] = str;
			// }
			return {alignments : track,
				stage: $.stage.current};
		},
		//translates the grid color to its respected nucletide
		convertColor: function(nuc) {
			if (nuc.hasClass("nuc-G"))
				return "G";
			if (nuc.hasClass("nuc-C"))
				return "C";
			if (nuc.hasClass("nuc-A"))
				return "A";
			if (nuc.hasClass("nuc-T"))
				return "T";
			return null;
		}
	};
})();