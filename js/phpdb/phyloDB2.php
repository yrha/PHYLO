<?php
$input = $_POST;
$query = "";
foreach ($input as $key => $value) {
	$query .= "$key=$value&";
}

$file = "http://phylo.alfredkam.com/phpdb/phyloDB.php?$query";
$contents = file($file);
foreach ($contents as $line) {
	echo str_replace("<", "&lt;", $line);
}
?>
