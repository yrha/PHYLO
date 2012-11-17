<?php
	require_once 'systemComponents.php';
	
	class dbConnector extends systemComponents {
		var $theQuery;
		var $link;
		
		function dbConnector(){
			//load from parent class
			$settings = systemComponents::getSettings();
			
			//get main settings
			$host = $settings['dbhost'];
			$db = $settings['dbname'];
			$user = $settings['dbusername'];
			$pass = $settings['dbpassword'];			
			//connect
//			echo "$host $db $user";
			$this->link = mysql_connect($host, $user, $pass);
			mysql_select_db($db);
			register_shutdown_function(array(&$this, 'close'));
		}
		
		//query func
		function query($query){
			$this->theQuery = $query;
			return mysql_query($query, $this->link);
		}

		function escapeString($string)
		{
			return mysql_real_escape_string($string, $this->link);
		}
		
		function fetchArray($result){
			return mysql_fetch_array($result);
		}
		
		function rows($result){
			return mysql_num_rows($result);
		}
		
		function close(){
			mysql_close($this->link);
		}
	
	
	}
	
?>
