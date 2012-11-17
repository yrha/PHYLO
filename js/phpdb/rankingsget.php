<?php
include './dbConnector.php';
error_reporting(0);
$f = fopen("levelpars.txt","r");
$fstring = fread($f,filesize("levelpars.txt"));
fclose($f);
$levelpars = json_decode($fstring);
//change above to fix path as needed
//note that systemComponents.php will need the correct database information

if($_GET['type']=="monthly") {
	$days = 30;
} else {
	$days = 7;
}
if($_GET['lang']=='fr') {
	$lang='fr';
} else {
	$lang='en';
}
$connector = new dbConnector();
$date = date("Y-m-d");
$result = $connector->query("SELECT user,level_id,score FROM alignments WHERE DATE_SUB(CURDATE(), INTERVAL $days DAY) <= date_submitted ORDER BY user,level_id,score DESC");
$rankings = array();
$score = 0;
$array = $connector->fetchArray($result);
$user = $array['user'];
$level_id = -1;
do {
	if ($array['user'] != $user) {
		if ($user != "guest" && $score > 0) {
			$rankings[$user] = $score;
		}
		$score = 0;
		$level_id = -1;
	}
	$user = $array['user'];
	
	if($level_id == $array['level_id']) {
		continue;
	}
	$level_id = $array['level_id'];
	if (array_key_exists($level_id,$levelpars)) {
		if($levelpars[$level_id] < $array['score']) {
			$score++;
		}
	} else {
		$parquery = $connector->query("SELECT original_score FROM levels WHERE level_id = $level_id");
		$pararray = $connector->fetchArray($parquery);
		if($pararray['original_score'] < $array['score']) {
			$score++;
		}
	}
//	$user = $array['user'];
//	$level_id = $array['level_id'];
//	$score = $array['score'];
//	echo "$user $level_id $score<br>\n";
} while($array = $connector->fetchArray($result));
$rank = 1;
$currentrank = 1;
$previousscore = -1;
arsort($rankings);
echo "<pre>";
//var_dump($rankings);
echo "</pre>";
?>
<html>
<head>
<link href="../content/css/myframe.css" media="screen" rel="Stylesheet" type="text/css" />
</head>
<body>
<table id="ranking">
<?php
echo ($lang=="fr"?"<tr><th>Classement</th><th>Nom d'utilisateur</th><th>Score</th></tr>":"<tr><th>Rank</th><th>Username</th><th>Score</th></tr>");
foreach($rankings as $user => $score) {
	if($previousscore != $score) {
		$currentrank=$rank;
		$previousscore = $score;
	}
	echo "<tr ".($rank%2==0?"class=\"alt\"":"")."><td>$currentrank</td><td>$user</td><td>$score</td></tr>\n";
	$rank++;
}
?>
</table>
</body>
</html>
