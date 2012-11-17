<?php
	class systemComponents {
		var $settings;
		
		function getSettings() {
			//Database variable
			$settings['dbhost'] = "localhost";
			$settings['dbusername'] = "akawry";
			$settings['dbpassword'] = "260324367";
			$settings['dbname'] = "chrome-db-2012";
			return $settings;
		}
	}
?>
