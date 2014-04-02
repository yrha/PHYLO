(function() {
	//$.phylo.tree[$.stage.current].ancestor[i]	
	$.highlighter = {
		set : function() {
			//oops this module is for DNA only - return it
			if($.main.type != "DNA")
				return;
			//this.remove();
			$(".sequence").removeClass("highlighter-2");	
			var ancestor = $.phylo.tree[$.stage.current].ancestor;
			var track = $.sequence.track;
			var active = this.getActiveRows();

			for(var i=0;i < active.length;i++) {
				for(j=0, arr = track[active[i]], len = track[active[i]].length;j< len;j++) {
					try {
						//ancestor is not empty
						if(ancestor[j].toString().toLowerCase() != "x" && ancestor[j] != 0 
							//sequence is not equal to ancestor
						&& (!$("#"+arr[j]).hasClass("nuc-"+ancestor[j].toString().toUpperCase()))) {
							$("#"+arr[j]).addClass("highlighter-2");
						}
					} catch(err) {
						console.log("Warning : Cell(s) fell off the chart");	
						if(DEV.logging)
							console.notify("Warning : Cell(s) fell off the chart");	
					}
				}
			}	
		},
		getActiveRows : function() {
			var row = [];
			$(".boardRow").each(function() {
				if($(this).hasClass("current")) {
					row.push(parseInt($(this).attr("id").replace(/row/,"")));
				}
			});
			return row;
		},
		remove : function() {
			$(".sequence").removeClass("highlighter-2");	
			return;
		},
	};	

})();
