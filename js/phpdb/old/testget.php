<?php
include './dbConnector.php';
include './xml2json/xml2json.php';
include '../../salt.php';
error_reporting(0);
//change above to fix path as needed
//note that systemComponents.php will need the correct database information

// Mode is type of query to make. 
// You can probably remove this and make the below figure it out based on what variables are given.
$diff = $_GET["diff"];
$connector = new dbConnector();
$result = $connector->query("SELECT level_xml FROM levels WHERE difficulty = $diff ORDER BY RAND() LIMIT 1");
var_dump($result);
$array = mysql_fetch_array($result);
var_dump($array);
$array = $connector->fetchArray($result);
echo mysql_error();
echo $array;
echo xml2json::transformXmlStringToJson($array['level_xml']);
//getCatalogue($user)
//getHighScore($top)

?>
