(function() {
	function g() {}
	g.prototype.start = function() {
		this.loadMenu();
	};
	g.prototype.loadMenu = function() {
		$(".random").html(lang[0].body.play.gameselect.levelselect.random["field 1"]);
		$(".level span:first-child").html("< "+lang[0].body.play.gameselect.levelselect["level id"]["field 4"]);
		$("#level").val(lang[0].body.play.gameselect.levelselect["level id"]["field 3"]);
		$("#tutorial").html("<span>"+lang[0].header["field 2"]+"</span>");
		$("#about").html("<span>"+lang[0].header["field 3"]+"</span>");
		$(".disease").html(lang[0].body.play.gameselect.levelselect.disease["field 1"]);
		
		var diseaseorder =  [
			["digestive","../img/digestive.png","150px",""],
			["heart", "../img/heart.png","110px","30px"],
			["cancer", "../img/cancer.png","100px","55px"],
			["metabolic", "../img/metabolic.png","100px",""],
			["blood","../img/blood.png","50px","10px"],
			["sensory","../img/sensory.png","60px","30px"],
			["brain","../img/brain.png","80px",""],
			["muscles","../img/muscles.png","60px",""],
			["lung","../img/lung.png","60px",""]
		];
		var str= "";
		for(var i=0;i<diseaseorder.length;i++) {
			str+="<img title='"+diseaseorder[i][1]+"'src='"+diseaseorder[i][1]+"' id='"+i+"' class='"+(i>4?"img-shift":"")+"'/>";
		}		
		$(".disease-level").html(str);
		this.inputEvent();	
		this.clickEvent();
	};
	g.prototype.clickEvent = function() {
		$(".random-level div").click(function() {
			var i = $.trim($(this).children().html());
			var hash = window.location.hash.toUpperCase();
			hash = hash.replace('#',"").toLowerCase();
			document.getElementById('frame').src = 'http://phylo.cs.mcgill.ca/js/index2.html?lang='+hash+'&type=random&random='+i+'#home';
			$(".wrapper").hide();
			$("#frame").show();
			
		});
		$(".level").click(function() {
			var id = $.trim($("#level").val());
			var hash = window.location.hash.toUpperCase();
			hash = hash.replace('#',"").toLowerCase();
			document.getElementById('frame').src = 'http://phylo.cs.mcgill.ca/js/index2.html?lang='+hash+'&type=disease&disease='+id+'#home';
			$(".wrapper").hide();
			$("#frame").show();
		});
		$(".disease-level img").click(function() {
			var i = $.trim($(this).attr("id"));
			var id = diseaseList[i][1][Math.floor(Math.random()*diseaseList[i][1].length)];
			var hash = window.location.hash.toUpperCase();
			hash = hash.replace('#',"").toLowerCase();
			document.getElementById('frame').src = 'http://phylo.cs.mcgill.ca/js/index2.html?lang='+hash+'&type=disease&disease='+id+'#home';
			$(".wrapper").hide();
			$("#frame").show();
		});

	};
	g.prototype.inputEvent = function() {
		$("#level").each(function() {
			var def = $(this).val();
			$(this).focus(function() {
				if($(this).val() == def)
					$(this).attr("value","");
			}).focusout(function() {
				if($.trim($(this).val())== "")
					$(this).attr("value",def);
			});
		});
	};
	
	var proto = g.prototype,	
		attr = [
			["start",proto.start],
			];
	common.exportSingleton("device", g, attr);
	
})();
