<?php
include './dbConnector.php';
include './xml2json/xml2json.php';
include '../../salt.php';
error_reporting(0);
//change above to fix path as needed
//note that systemComponents.php will need the correct database information

$connector = new dbConnector();
$levelpars = array();
$levelpars[0] = 0;
$result = $connector->query("SELECT level_id,original_score FROM levels ORDER BY level_id,original_score ASC");
while($array = $connector->fetchArray($result)) {
	$levelpars[$array['level_id']] = intval($array['original_score']);
}
$test = json_encode($levelpars);
echo $test;
?>
