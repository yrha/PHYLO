<?php
include './dbConnector.php';
error_reporting(0);

//change above to fix path as needed
//note that systemComponents.php will need the correct database information

$connector = new dbConnector();
$date = date("Y-m-d");

// $result = $connector->query("SELECT user,level_id,score FROM alignments WHERE DATE_SUB(CURDATE(), INTERVAL $days DAY) <= date_submitted ORDER BY user,level_id,score DESC");
$results = $connector->query("SELECT user,level_id,score,date_submitted FROM alignments WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= date_submitted ORDER BY user,level_id,score DESC");
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

$monthranking = array();
$weekranking = array();

$lastweek = mktime(0,0,0,date("m"),date("d")-7,date("Y"));

while ($myrow = $connector->fetchArray($results)) {
      $user = $myrow['user'];
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

      // update monthly ranking
      if (array_key_exists($user,$monthranking)) {
      	 if (array_key_exists($levelid,$monthranking[$user])) {
	    if ($starscore > $usertable[$levelid]) {
	       $monthranking[$user][$levelid] = $starscore;
	       $monthranking[$user]['total'][$usertable[$levelid]] -= 1;
	       $monthranking[$user]['total'][$starscore] += 1;
	    }
	 } else {
	   $monthranking[$user][$levelid] = $starscore;
	   $monthranking[$user]['total'][$starscore] += 1;
	 }
      } else {
      	$monthranking[$user] = array();
	$monthranking[$user][$levelid] = $starscore;
	$monthranking[$user]['total']= array(0,0,0,0);
	$monthranking[$user]['total'][$starscore] += 1;
      }

      // update weekly ranking
      if ($date >= $lastweek) {
         if (array_key_exists($user,$weekranking)) {
            if (array_key_exists($levelid,$weekranking[$user])) {
               if ($starscore > $usertable[$levelid]) {
               	  $weekranking[$user][$levelid] = $starscore;
               	  $weekranking[$user]['total'][$usertable[$levelid]] -= 1;
               	  $weekranking[$user]['total'][$starscore] += 1;
               }
           } else {
             $weekranking[$user][$levelid] = $starscore;
             $weekranking[$user]['total'][$starscore] += 1;
           }
      	 } else {
            $weekranking[$user] = array();
            $weekranking[$user][$levelid] = $starscore;
            $weekranking[$user]['total']= array(0,0,0,0);
            $weekranking[$user]['total'][$starscore] += 1;
         }
      }
}
?>
<div id="ranking">

<div id="rankingselect">
<button class="showall" id="selectButton">All-time</button>
<button class="showmonth" id="selectButton">Monthly</button>
<button class="showweek" id="selectButton">Weekly</button>
</div>

<div id="monthly">
<table cellpadding="0" cellspacing="0" border="0" class="display dataTable" id="rankingtable" width="100%">
<thead>
<tr><td>Username</td><td>3 Stars</td><td>2 Stars</td><td>1 Star</td></tr>
</thead>
<tbody>
<?php
foreach ($monthranking as $user => $info) {
	echo "<tr><td>" . $user . "</td><td>" . $info['total'][3] . "</td><td>" . $info['total'][2] . "</td><td>" . $info['total'][1] . "</td></tr>\n";
};
?>
</tbody>
</table>
</div>

<div id="weekly">
<table cellpadding="0" cellspacing="0" border="0" class="display dataTable" id="rankingtable" width="100%">
<thead>
<tr><td>Username</td><td>3 Stars</td><td>2 Stars</td><td>1 Star</td></tr>
</thead>
<tbody>
<?php
foreach ($weekranking as $user => $info) {
        echo "<tr><td>" . $user . "</td><td>" . $info['total'][3] . "</td><td>" . $info['total'][2] . "</td><td>" . $info['total'][1] . "</td></tr>\n";
};
?>
</tbody>
</table>
</div>

</div>

