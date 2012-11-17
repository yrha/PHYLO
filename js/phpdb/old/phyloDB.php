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
$id = $_GET["id"];
$diff = $_GET["diff"];
$align = $_GET["align"];
$user = $_GET["user"];
$score = $_GET["score"];
$pass = $_GET["pass"];
$email = $_GET["email"];
$message = $_GET["message"];
$browser = $_GET["browser"];
switch ($mode) {
		// Mode 0 is to handle error logging
	case 0: 
		$connector = new dbConnector();
		$message = $connector->escapestring($message);
		$browser = $connector->escapestring($browser);
		$connector->query("INSERT INTO error('message','browser') VALUES ('$message','browser')");
		break;
		// Mode 1 is getting a random level of a given difficulty
	case 1:
		$connector = new dbConnector();
		$diff = $connector->escapestring($diff);
		$result = $connector->query("SELECT level_xml FROM levels WHERE difficulty = $diff ORDER BY RAND() LIMIT 1");
		$array = $connector->fetchArray($result);
		echo xml2json::transformXmlStringToJson($array['level_xml']);
		break;
		// Mode 2 is getting a level given its ID
	case 2:
		$connector = new dbConnector();
		$id = $connector->escapestring($id);
		$result = $connector->query("SELECT level_xml FROM levels WHERE level_id = $id LIMIT 1");
		$array = $connector->fetchArray($result);
		echo xml2json::transformXmlStringToJson($array['level_xml']);
		break;
		// Mode 3 is to pipe out the stats for after completing a level.
	case 3:
		$connector = new dbConnector();
		$id = $connector->escapestring($id);
		$connector->query("UPDATE levels SET fail_count = fail_count + 1 WHERE level_id = $id");
		$result = $connector->query("SELECT disease_link,play_count,fail_count,best_score,running_score,highscore_user FROM levels WHERE level_id = $id LIMIT 1");
		$array = json_encode($connector->fetchArray($result));
		echo $array;
		break;
		// Mode 4 is to insert a completed alignment for the level
	case 4:
		$connector = new dbConnector();
		$align = $connector->escapestring($align);
		$id = $connector->escapestring($id);
		$user = $connector->escapestring($user);
		$score = $connector->escapestring($score);
		$date = date("Y-m-d");
		$connector->query("INSERT INTO newalignments SET alignment='$align', level_id=$id, user='$user', score=$score, date_submitted='$date'");
		$result = $connector->query("SELECT best_score FROM levels WHERE level_id = $id");
		$array = $connector->fetchArray($result);
		$best = $array[0];
		if( $score >= $best && $user != 'guest') {
			$connector->query("UPDATE levels SET highscore_user = '$user' WHERE level_id = $id");
			$connector->query("UPDATE levels SET best_score = $score WHERE level_id = $id");
		}
		$connector->query("UPDATE levels SET play_count = play_count + 1, running_score = running_score + $score WHERE level_id = $id");
		if( $user != 'guest') {
			$connector->query("UPDATE users SET levels_played = levels_played + 1 WHERE name = '$user'");
		}
		$result = $connector->query("SELECT disease_link,play_count,fail_count,best_score,running_score,highscore_user FROM levels WHERE level_id = $id LIMIT 1");
		$array = json_encode($connector->fetchArray($result));
		echo $array;
		break;
		// Mode 5 is to output general stats for the game
	case 5:
		$connector = new dbConnector();
		$id = $connector->escapestring($id);
		$result = $connector->query("SELECT COUNT(*) FROM levels WHERE play_count>0");
		$tmp = $connector->fetchArray($result);
		$array['levels'] = $tmp[0];
		$result = $connector->query("SELECT COUNT(*) FROM alignments");
		$tmp = $connector->fetchArray($result);
		$array['alignments'] = $tmp[0];
		$result = $connector->query("SELECT COUNT(*) FROM users");
		$tmp = $connector->fetchArray($result);
		$array['users'] = $tmp[0];
		echo json_encode($array);
		break;
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
			echo "fail";
		} else {
			$connector->query("INSERT INTO users SET name='$user', password='$pass', email='$email', date_joined='$date', last_login='$date', levels_played=0");
			echo "succ";
		}
		break;
		// Mode 7 is to register a new user
	case 7:
		$connector = new dbConnector();
		$user = $connector->escapestring($user);
		$pass = $connector->escapestring($pass);
		$result = $connector->query("SELECT name, password, last_login FROM users WHERE name='$user'");
		$array = $connector->fetchArray($result);
		if (hash("sha512",$salt.$pass) != $array['password']) {
			echo "fail";
		} else {
			$date = date("Y-m-d");
			$connector->query("UPDATE users SET last_login='$date'where name='$user'");
			echo "succ";
		}
		break;
}
//getCatalogue($user)
//getHighScore($top)

?>
