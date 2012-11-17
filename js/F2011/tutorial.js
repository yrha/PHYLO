/*
Developer: Alfred Kam (www.cs.mcgill.ca/~akam2/), McGill MCB
Version: 0.0.3
Last Update Sept 2011
*/

(function(){
	tutorial.fn = {
		inGameTutorial : function() {
			console.log("@ inGame Tutorial");
		},
		menuTutorial : function() {
			//lets create a light box here
			var doc = document, win = window;
			if(doc.getElementById("tutorial-pre") == undefined) {
				var div = doc.createElement("div");
				div.id = "tutorial-pre";
				doc.body.appendChild(div);
			}
			$("#tutorial-pre").html("<div class='tutorial-pre-box'></div><div class='tutorial-pre-content'></div>");
			$(".tutorial-pre-box").css({
				"position" : "absolute",
				"top" : "0",
				"left" : "0",
				"height" : win.innerHeight,
				"width" : win.innerWidth,
				"zIndex" : "201",
				"opacity" : "0.8",
				"background-color" : "#383838"
			});
			$(".tutorial-pre-content").css({
				"position" : "absolute",
				"zIndex" : "202"
			});
			if(common.checkDevice() == "other" ^ common.checkDevice() =="ipad") {
				$(".tutorial-pre-content").css("left",(win.innerWidth-560)/2);
				$(".tutorial-pre-content").css("top",(win.innerHeight-315)/2);
				if(mcb.GET("lang") == "en") {
					$(".tutorial-pre-content").html('<iframe width="560" height="315" src="http://www.youtube.com/embed/oKcvsgIQOt0" frameborder="0" allowfullscreen></iframe>');
				} else {
					$(".tutorial-pre-content").html('<iframe width="560" height="315" src="http://www.youtube.com/embed/hNUoJ4lnpAU" frameborder="0" allowfullscreen></iframe>');
				}
			} else {
				$(".tutorial-pre-content").css("left",(win.innerWidth-336)/2);
				$(".tutorial-pre-content").css("top",(win.innerHeight-189)/2);
				if(mcb.GET("lang") == "en") {
					$(".tutorial-pre-content").html('<iframe width="336" height="189" src="http://www.youtube.com/embed/oKcvsgIQOt0" frameborder="0" allowfullscreen></iframe>');
				} else {
					$(".tutorial-pre-content").html('<iframe width="336" height="189" src="http://www.youtube.com/embed/hNUoJ4lnpAU" frameborder="0" allowfullscreen></iframe>');
				}
			}
			$(".tutorial-pre-box").click(function() {
				$("#tutorial-pre").html("");
			});
		}			
	};
})();	

