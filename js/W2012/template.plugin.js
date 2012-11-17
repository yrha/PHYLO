//edit this part!
/*
Developed By Author
Tested By Name
Supervisor Name
Supported Device : list device
About : What is this plugin in for

version 0.0.0.1
Last Updated Date
*/

//Remember to add ur js script to index.shtml!!!
//Your js run / compile time error will not affect the framework
//enclosure
(function() {
	mcb.fn.templateName = {
		//types : init , gameStart , onMoveStart , onMoveStop , gameEnd
		//the type defines where to excute in the entire framework
		type : "init, gameStart",  //examples
		device: "desktop,mobile,tablet", //device support coming soon
		//this run will be called to execute your code
		run : function() {
			console.log("Plugin System Activiated");
			//your code here
		}
	}; 
})();

