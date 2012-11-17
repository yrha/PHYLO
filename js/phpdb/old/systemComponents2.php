<?php
	class systemComponents {
		var $settings;
		
		function getSettings() {
			//Database variable
			$settings['dbhost'] = "sql.crowdsource.alfredkam.com";
			$settings['dbusername'] = "phylo";
			$settings['dbpassword'] = "1337@phylo";
			$settings['dbname'] = "crowdsource";
			return $settings;
		}
	}
?>
