<?php
include "./dbConnector2.php";

$connector = new dbConnector();
$mode = $connector->escapestring($_POST['mode']);
$mode = intVal($mode);
$key = $connector->escapestring($_POST['key']);
$pluginToken = $connector->escapestring($_POST['pluginToken']);

//Project PluginSource Request
if($mode == 6){
        //check if user is valid
                $result = mysql_query("SELECT `pluginSource` FROM `Plugin` WHERE `pluginToken` = '$pluginToken'");
                $row = mysql_fetch_assoc($result);
                $pluginSrc = $row['pluginSource'];
                echo $pluginSrc;
}

?>
