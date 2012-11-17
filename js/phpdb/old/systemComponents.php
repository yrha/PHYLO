<?php
	class systemComponents {
		var $settings;
		
		function getSettings() {
			//Database variable
			$settings['dbhost'] = "sql.phylo.alfredkam.com";
			$settings['dbusername'] = "phylo";
			$settings['dbpassword'] = "1337@phylo";
			$settings['dbname'] = "crappy";
			return $settings;
		}
	}
?>
