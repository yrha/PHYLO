<?php
include './dbConnector.php';
include './xml2json/xml2json.php';
include '../../salt.php';
error_reporting(0);
//change above to fix path as needed
//note that systemComponents.php will need the correct database information

$mode = $_GET["mode"];
// Mode is type of query to make. 
// You can probably remove this and make the below figure it out based on what variables are given.
$id = $_POST["id"];
$diff = $_POST["diff"];
$align = $_POST["align"];
$user = $_GET["user"];
$score = $_POST["score"];
$pass = $_GET["pass"];
$email = $_GET["email"];
switch ($mode) {
		// Mode 6 is to register a new user
	case 6:
		$connector = new dbConnector();
		$user = $connector->escapestring($user);
		$pass = $connector->escapestring(hash("sha512",$salt.$pass));
		$email = $connector->escapestring($email);
		$date = date("Y-m-d");
		$result = $connector->query("SELECT name FROM users WHERE name='$user'");
		$array = $connector->fetchArray($result);
		if (count($array) > 1) {
			echo "User already exists!";
		} else {
			$connector->query("INSERT INTO users SET name='thisisatestuser', password='$pass', email='$email', date_joined='$date', last_login='$date', levels_played=0");
			echo "Account created!";
		}
		break;
		// Mode 7 is to register a new user
	case 7:
		$connector = new dbConnector();
		$user = $connector->escapestring($user);
		$pass = $connector->escapestring($pass);
		$result = $connector->query("SELECT name, password FROM users WHERE name='$user'");
		$array = $connector->fetchArray($result);
		echo "$user $pass";
		if (hash("sha512",$salt.$pass) != $array['password']) {
			echo "User/pass incorrect!";
		} else {
			$date = date("Y-m-d");
			$connector->query("UPDATE users SET last_login='$date'where name='$user'");
			echo "Login successful!";
		}
		break;
}
//getCatalogue($user)
//getHighScore($top)

?>
