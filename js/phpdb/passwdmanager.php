<?php

$username=$_POST['username'];
$userid=$_POST['id'];
$seed=$username+$userid;

echo md5($seed);

?>
