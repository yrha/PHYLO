(function() {
	window.built = {
		init : function() {
			var login = lang[0].body.play.gameselect.login;
			$("#email-box span").html(login["field 9"]);
			$("#username span").html(login["field 7"]);
			$("#password span").html(login["field 8"]);
			$("#login-button div").html(login["field 2"]);
			$("#login-register").html(login["field 3"]);
			$("#login_button div").html(login["field 2"]);
			this.checkIfIn();
			this.events();
		},
		checkIfIn : function() {
			var login = lang[0].body.play.gameselect.login;
			if(mcb.cookie.read("PhyloLogin") != null) {
				$("#login_button div").html(login["field 5"]);
			}
		},	
		events : function() {
			var login = lang[0].body.play.gameselect.login;
			$("#login_button").click(function() {
				$("#email-box").hide();
				$("#login-button div").html(login["field 2"]);
			});

			$("#login-button").click(function() {
				var name = "";
				if($("#login-button div").html() == login["field 2"]) {
					var data = "mode=7";
				} else {
					var data = "mode=6";
				}
				$("#login_box input").each(function() {
					if($("#login-button div").html() == login["field 3"]) {
						if($(this).attr("name") != "email") {
							data+="&"+$(this).attr("name")+"="+$(this).val().trim();
							if($(this).attr("name") == "user")
								name = $(this).val();

						} 
					} else {
						data+="&"+$(this).attr("name")+"="+$(this).val().trim();
						if($(this).attr("name") == "user")
							name = $(this).val();
					}
				});
				$.ajax({
					url :"../phpdb/phyloDB2.php",
					type :"POST",
					data : data
				}).done(function(d) {
					if(d == "succ") {
						mcb.cookie.create("PhyloLogin",name, 360);	
						$("#login_box").toggle(function() { } );
						$("#login_button div").removeClass("onHover");	
						$("#login_button div").html(login["field 5"]);
					} else {
						if($("#login-button div").html() == login["field 3"]) {
							$.invalid.box(((login["field 20"] == "")?login["field 16"]:login["field 20"]));
						} else {
							$.invalid.box(login["field 16"]);
						}
					}
				});
			});
			$("#login-register").click(function(){
				if($(this).html() == login["field 3"]) {
					$("#email-box").fadeIn("fast");
					$("#login-register").html(login["field 2"]);
					$("#login-button div").html(login["field 3"]);	
				} else {
					$("#email-box").fadeOut("fast");
					$("#login-register").html(login["field 3"]);
					$("#login-button div").html(login["field 2"]);	

				}
			});
		}
	}

})();
