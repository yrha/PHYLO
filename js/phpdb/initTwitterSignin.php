<?php

/* submit */

$url = 'https://api.twitter.com/oauth/request_token';
$nonce = time();
$timestamp = time();

$fields = array(
            'oauth_callback'=> 'http://phylo.cs.mcgill.ca',
              'oauth_consumer_key' => 'yourconsumerkey',
              'oauth_nonce' => $nonce,
              'oauth_signature_method' => 'HMAC-SHA1',
              'oauth_timestamp' => $timestamp,
              'oauth_version' => '1.0'
        );
$fields_string="";
foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string,'&');

$postdata = http_build_query($fields);
$opts = array('http' =>
        array(
                'method' => 'POST',
                'header' => 'Content-type: application/x-www-form-urlencoded',
		'content' => $postdata
));

$result = file_get_contents($url, false, stream_context_create($opts));

echo $result;

?>