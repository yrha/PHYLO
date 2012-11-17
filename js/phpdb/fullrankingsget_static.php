<?php
include './dbConnector.php';
error_reporting(0);

//change above to fix path as needed
//note that systemComponents.php will need the correct database information

$connector = new dbConnector();
$date = date("Y-m-d");

$results = $connector->query("SELECT user,level_id,score,date_submitted FROM alignments ORDER BY user,level_id,score DESC");
$levels = $connector->query("SELECT level_id,difficulty,best_score,original_score,disease_category,disease_link from levels");

// build array with level infos
$myscoretable = array();
while ($myrow = $connector->fetchArray($levels)) {
      $newid = $myrow['level_id'];
      $myscoretable[$newid] = array();
      $myscoretable[$newid]['best'] = $myrow['best_score'];
      $myscoretable[$newid]['original'] = $myrow['original_score'];
      $myscoretable[$newid]['difficulty'] = $myrow['difficulty'];
      $myscoretable[$newid]['disease_category'] = $myrow['disease_category'];
      $myscoretable[$newid]['disease_name'] = $myrow['disease_link'];
};

// compute star ranking

$alltimeranking = array();

while ($myrow = $connector->fetchArray($results)) {
      $user = $myrow['user'];

      if ($user != 'guest') {
         $levelid = $myrow['level_id'];
         $score = $myrow['score'];
         $date = strtotime($myrow['date_submitted']);

         // compute star rating
         $starscore=0;
         if ($score >= $myscoretable[$levelid]['best']) {
      	    $starscore = 3;
         } else {
      	    if ($score > $myscoretable[$levelid]['original']) {
	       $starscore = 2;
	    } else {
               if ($score == $myscoretable[$levelid]['original']) {
                  $starscore = 1;
	       }
            }
         }

         // update ranking
         if (array_key_exists($user,$alltimeranking)) {
            if (array_key_exists($levelid,$alltimeranking[$user])) {
	       if ($starscore > $alltimeranking[$user][$levelid]) {
	          $alltimeranking[$user]['total'][$alltimeranking[$user][$levelid]] -= 1;
	          $alltimeranking[$user]['total'][$starscore] += 1;
                  $alltimeranking[$user][$levelid] = $starscore;
	       }
	    } else {
	       $alltimeranking[$user][$levelid] = $starscore;
	       $alltimeranking[$user]['total'][$starscore] += 1;
	    }
         } else {
      	    $alltimranking[$user] = array();
	    $alltimranking[$user][$levelid] = $starscore;
	    $alltimeranking[$user]['total']= array(0,0,0,0);
	    $alltimeranking[$user]['total'][$starscore] += 1;
         }
   }
}
?>

<div id="alltime">
<table cellpadding="0" cellspacing="0" border="0" class="display dataTable" id="rankingtable" width="100%">
<thead>
<tr><td>Username</td><td>3 Stars</td><td>2 Stars</td><td>1 Star</td><td>Total</td></tr>
</thead>
<tbody>
<?php
foreach ($alltimeranking as $user => $info) {
	if ($info['total'][3] + $info['total'][2] + $info['total'][1] >= 100) {
	   $total = $info['total'][3] + $info['total'][2] + $info['total'][1];
	   echo "<tr><td>" . $user . "</td><td>" . $info['total'][3] . "</td><td>" . $info['total'][2] . "</td><td>" . $info['total'][1] . "</td><td>" . $total . "</td></tr>\n";
	}
};
?>
</tbody>
</table>
</div>

