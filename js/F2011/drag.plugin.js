(function() {
	phylo.fn.drag = {
		onStart : "test",
		start : "test"
	}; 
})();

(function() {
	for(var i in phylo.fn) {
		console.log(i.start);
		console.log(i);
		console.log(phylo.fn[i].onStart);
	}
})();
