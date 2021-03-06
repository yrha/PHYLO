(function(){
	$.endGame = {
		//displays message of completing the game
		complete : function() {
			var self = this;
			$.multiSelect.deactive();
			$.protocal.sendEndGameScore("completed", function(data) {
				self.events();
				self.score("completed",data.best_score);
				//var msg = "<b>Congratulations!</b> You have solved the puzzle";
				var msg = window.lang.body.play.gameselect["end of game"]["field 3"];
				$("#endGame-text").html(msg);
				$("#endGame-learnMore-content").html(self.learnMore(data));
				$("#endGame").fadeIn();
			});

		},
		//displays message of bailing out
		bail : function() {
			var self = this;
			$.multiSelect.deactive();
			$.protocal.sendEndGameScore("bail", function(data) {
				self.events();
				self.score("bail",data.best_score);
				//var msg = "Too bad! You did not succeed to solve this puzzle!";
				var msg = window.lang.body.play.gameselect["end of game"]["field 4"];
				$("#endGame-text").html(msg);
				//$("#endGame-learnMore-content").html("This disease is related to diseases etc, you are helping...etc");
				console.log(data);
				$("#endGame-learnMore-content").html(self.learnMore(data));
				$("#endGame").fadeIn();
			});

		},
		learnMore : function(json) {
			var context = "";
			try {
			var endGameContext = lang.body.play.gameselect["end of game"];
			context = endGameContext["field 5"].replace("***","<label class='end-color'>"+$.phylo.id+"</label>") +
						" <label class='end-color'>"+json.disease_link+"</label>.  "+endGameContext["field 6"].replace("***","<label class='end-color'>"+json.play_count+"</label>").replace(".",".<br>").replace("***","<label class='end-color'>"+json.fail_count+"</label>")+
						endGameContext["field 7"].replace("***","<label class='end-color'>"+json.best_score+"</label>")+" "+
						endGameContext["field 8"].replace("***","<label class='end-color'>"+Math.round(json.running_score/json.play_count)+"</label>") +" <br>"+
						endGameContext["field 9"].replace("***","<label class='end-color'>"+json.highscore_user+"</label>");
			} catch (err) {
				context = "This disease is related to disease etc, you are helping...etc";
			} 
			return context;

		},
		//scores the game
		score : function(status, highscore) {
			//remove background music... make it stop!
			$("#musicPlayerSpot").html("");
			//gets current score		
			var setDefault = "<i class='icon-star-empty'></i><i class='icon-star-empty'></i><i class='icon-star-empty'></i>";	
			$("#endGame-score-result").html(setDefault);
            $("#endGame-share").hide();
			if(status == "bail")
				return;
			var currentScore = $.phylo.currentScore;
			var par = $.sequence.par;
			if(par < currentScore && currentScore < highscore) {
				setDefault = "<i class='icon-star'></i><i class='icon-star'></i><i class='icon-star-empty'></i>";
                $("#endGame-share").hide();
			} else if( highscore <= currentScore) {
				setDefault = "<i class='icon-star'></i><i class='icon-star'></i><i class='icon-star'></i>";	
                $("#endGame-share").show();
			} else { //exactly par score
				setDefault = "<i class='icon-star'></i><i class='icon-star-empty'></i><i class='icon-star-empty'></i>";	
                $("#endGame-share").hide();
			}
			$("#endGame-score-result").html(setDefault);
		},
        // share highscore on social network
        share : function() {
            if($.cookie.read("username")) {
                var username = $.cookie.read("username");
                var fullname = $.cookie.read("fullname");
                var provider = $.cookie.read("loginmode");
                var c_logid = $.cookie.read("logid");
                if (provider=="Facebook") {
                    $.protocal.sendEndGameScore("completed", function(data) {
                        var puzzle_disease = data.disease_link;
                        var message = fullname.replace("+"," ") + " received the new highscore and improved a DNA alignments related to \"" + puzzle_disease + "\".\nPlay Phylo and help genetic research!";
                        var caption = "DNA puzzles";
                        var data = "provider="+provider+"&id="+c_logid+"&caption="+caption+"&description="+message;
                        bootbox.confirm("Phylo will update your status: " + message,"Cancel","Post", function(result) {
                            if (result) {
                                console.log("post on " + provider + " : " + message);
                                $.ajax({
                                    type: "POST",
                                    url : "http://phylo.cs.mcgill.ca/phpdb/hybridauth/signin/feed.php",
                                    data : data,
                                }).done(function(re) {
                                    //bootbox.alert("Your achievement has been posted!");
                                }).fail(function() {
                                    bootbox.alert("We are sorry. We have not been able to post your achievement.");
                                });
                            }
                        });
                    });
                } else if (provider=="Twitter") {
                    $.protocal.sendEndGameScore("completed", function(data) {
                        var puzzle_disease = data.disease_link;
                        var message = "Improved a DNA alignments related to \"" + puzzle_disease + "\".";
                        var data = "provider="+provider+"&id="+c_logid+"&description="+message;
                        bootbox.confirm("Phylo will update your status: " + message,"Cancel","Tweet", function(result) {
                            if (result) {
                                console.log("post on " + provider + " : " + message);
                                $.ajax({
                                    type: "POST",
                                    url : "http://phylo.cs.mcgill.ca/phpdb/hybridauth/signin/feed.php",
                                    data : data,
                                }).done(function(re) {
                                    //bootbox.alert("Your achievement has been posted!");
                                }).fail(function() {
                                    bootbox.alert("We are sorry. We have not been able to post your achievement.");
                                });
                            }
                        })
                    });
                } else if (provider=="LinkedIn") {
                    $.protocal.sendEndGameScore("completed", function(data) {
                        var puzzle_disease = data.disease_link;
                        var message = fullname.replace("+"," ") + " used Phylo and improved a DNA alignments related to \"" + puzzle_disease + "\".";
                        var data = "provider="+provider+"&id="+c_logid+"&description="+message;
                        bootbox.confirm("Phylo will update your status: " + message,"Cancel","Post", function(result) {
                            if (result) {
                                console.log("post on " + provider + " : " + data);
                                $.ajax({
                                    type: "POST",
                                    url : "http://phylo.cs.mcgill.ca/phpdb/hybridauth/signin/feed.php",
                                    data : data,
                                }).done(function(re) {
                                    //bootbox.alert("Your achievement has been posted!");
                                }).fail(function() {
                                    bootbox.alert("We are sorry. We have not been able to post your achievement.");
                                });
                            }
                        })
                    });
                } else {
                    console.log("Provider " + provider + " is not supported.");
                    return;
                }
            } else {
                alert("You seem to have been disconnected. Please, login again.");
                // delete cookie (just to be safe)
                $.cookie.delete("username");
                $.cookie.delete("fullname");
                $.cookie.delete("loginmode");
                $.cookie.delete("logid");
                $("#logout").hide();
                window.guest = 'guest';
                $("#login-box").hide();
                $(".login-btn").click(function() { eClick(); });
                $("#login-tag").html("Login");
                $(".showInLogin").hide();
                return;
            }
        },
		//events for the end game messages
		//new game or replay game
		events : function() {
			$("#endGame-learnMore-content").hide();
	
			$("#endGame-learnMore-tag button").unbind().click(function() {
				$("#endGame-learnMore-content").slideToggle("fast",function() {

				});
			});

			$("#endGame-new button").unbind().click(function() {
				//window.location.reload(true);
				$("#game").hide();
				$("#endGame").fadeOut();
				interactiveMenu.restart();
				$("#draw").show();
				$("#menu").fadeIn();
				//window.location.hash = "#!play";
			});
				
			$("#endGame-replay button").unbind().click(function(){
				$.main.clear();
				$("#endGame").fadeOut();
				$("#tree").html("");
				$("#gameBoard").html("<img src='img/loading.gif'/>");
				$.protocal.replay();
				$("#countDown-text").html("<img src='img/loading.gif'/>");
				$("#countDown").fadeIn();
			});
 
            $("#endGame-share button").unbind().click(function(){
                console.log("Click share event");
                $.endGame.share('test');
            });
		},
		//a pop up message to check if really want to bail out from the game
		runAway : function() {
			$("#runaway").unbind().click(function() {
				$.helper.popUp("You sure you want to bail out from this puzzle?", function(status) {
					if(status == "ok") {
						$.endGame.bail();
						$.timer.active = false;
					}
				});
			});	
		}
	}
})();
