		g.prototype.forward = function(stage,pos) {
			var tree = this.tree[stage];
			var grid = this.grid;
			if(tree.child == 2) {
				var x = this.forward(tree.node2,pos);
				var y = this.forward(tree.node1,pos);
				var b = [];
				for(var i=0;i<x.length;i++) 
					for(var j=0;j<y.length;j++) {
						if(x[i] == y[i])
							b.push(x[i]);
					}
				if(b.length < 1)
					return x.concat(y);
				else
					return b;
				
			} else if(tree.child == 1) {
				var x = this.forward(tree.node2,pos);
				var y = this.trans(grid[tree.node1][pos]);
				if(x.indexOf(y) > -1) {
					return [y];
				} else {
					return x.concat([y]);
				}
			} else  {
				var x = this.trans(grid[tree.node1][pos]);
				var y = this.trans(grid[tree.node2][pos]);
				if(y == x)
					return [x];
			 	else 
					return [x,y];
			}
		}
		
		g.prototype.backward = function(stage) {
			var len = this.grid[0].length;
			var arr = [];
			for(var i=0;i<len;i++) {
				var x = this.forward(stage,i);
				if(x.length < 1)
					arr.push("x");
				else if (x.length == 1 || x.indexOf("x") != 0) { 
					//arr.push(x[Math.floor(Math.random()*x.length)]);
					arr.push(x[0]);
				}
				else
					arr.push(x[1]);
			}
			return arr;
		};
