/*
 * This is the starting point of the javascript. It chooses whether to load the producion,
 * a compiled and minified javascript file in build, or use requirejs loading of scripts ("dev").
 * 
 * replace "sitename" with the proper namespace.
 */
(function(){
	
	//TODO: Change the sitename to whatever your site name is.
	var sitename = "PHYLO";
	
	window[sitename] = window[sitename] || {};
	
	var namespace = window[sitename];
	
	var config = (namespace.config = namespace.config || {});
	
	//TODO: Change to either "dev" or "stage", "production"
	config.env = "dev";
	
	var dev = {
			DEBUG: true,
			
			social: {
				github: {
					clientId: ""
				},
				
				google: {
					clientId: ""
				}
			},
			
			host : window.location.origin
			
	};	
	
	var stage = {
		DEBUG : true,
		social: {
			github: {
				clientId: ""
			},
			
			google: {
				clientId: ""
			}
		},
		
		host : window.location.origin
	};
	
	var production = {
		DEBUG: false,
		
		social: {
			github: {
				clientId: ""
			},
			
			google: {
				clientId: ""
			}
		},
		
		host : window.location.origin
	};
	
	config.dev = config.dev || {};
	for(var attr in dev)
	{
		config.dev[attr] = dev[attr];
	}

	config.stage = config.stage || {};
	for(var attr in stage) {
		config.stage[attr] = stage[attr];
	}
	
	config.production = config.production || {};
	for(var attr in production)
	{
		config.production[attr] = production[attr];
	}
	
	namespace.getConfig = function(){
		return this.config[this.config.env];
	};
	
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	
	if(config.env === "dev")
	{
		script.setAttribute("data-main", "assets/scripts/main/"+sitename+"-main.js");
		script.setAttribute("src", "assets/bower_components/requirejs/require.js");
	}

	if(config.env === "stage")
	{
		script.setAttribute("data-main", "assets/scripts/main/"+sitename+"-build-stage.compress.js");
		script.setAttribute("src", "assets/bower_components/requirejs/require.js");
	}
	
	else if(config.env === "production")
	{
		//script.setAttribute("src", "dist/main.min.js");
		script.setAttribute("src", "assets/scripts/require.min.js");
		script.setAttribute("data-main", "assets/scripts/main/"+sitename+"-build.min.js");
	}
	
	document.getElementsByTagName("body")[0].appendChild(script);
})();