(function(){
	
	$(document).ready(function() {
	$(".dropDownTriangle").hide();
		$("#option-list").hide();
		$("#language-list").hide();

	window.setTimeout(function() {
		$("#dropDown-logoTriangle").hide();
		$("#dropDown-logo").hide();
	},100);

	$("html").click(function() {
		$("#option-list").hide();
		$("#options-button .dropDownTriangle").hide();
		$("#options-button").removeClass("dropDown-OnSelect");
		
		$("#language-list").hide();
		$("#language").removeClass("dropDown-OptionOnSelect");
		$(".dropDownTriangle").hide();

		$("#dropDown-logoTriangle").hide();
		$("#dropDown-logo").hide();
		$("#logo").removeClass("logo-OnSelect");
	});
	
	$("#options-button").click(function(event) {
		event.stopPropagation();
		$(this).addClass("dropDown-OnSelect");
		$(".dropDownTriangle").show();
		$("#option-list").show();
	});
	
	$("#language").mouseover(function() {
		$("#language-list").show();
		$(this).addClass("dropDown-OptionOnSelect");
	});

	$("#logo").mouseover(function(event) {
		event.stopPropagation();
		$("#dropDown-logoTriangle").show();
		$("#dropDown-logo").show();
		$(this).addClass("logo-OnSelect");
	});

	});
})();
