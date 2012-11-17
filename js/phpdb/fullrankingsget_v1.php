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
$monthranking = array();
$weekranking = array();

$lastmonth = mktime(0,0,0,date("m"),date("d")-30,date("Y"));
$lastweek = mktime(0,0,0,date("m"),date("d")-7,date("Y"));

while ($myrow = $connector->fetchArray($results)) {
      $user = $myrow['user'];
      $levelid = $myrow['level_id'];
      $score = $myrow['score'];
      $date = strtotime($myrow['date_submitted']);

      if ($user != 'guest') {
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

      // update monthly ranking
      if ($date >= $lastmonth) {

      if (array_key_exists($user,$monthranking)) {
      	 if (array_key_exists($levelid,$monthranking[$user])) {
	    if ($starscore > $monthranking[$user][$levelid]) {
	       $monthranking[$user]['total'][$monthranking[$user][$levelid]] -= 1;
	       $monthranking[$user]['total'][$starscore] += 1;
               $monthranking[$user][$levelid] = $starscore;
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
               if ($starscore > $weekranking[$user][$levelid]) {
               	  $weekranking[$user]['total'][$weekranking[$user][$levelid]] -= 1;
               	  $weekranking[$user]['total'][$starscore] += 1;
                  $weekranking[$user][$levelid] = $starscore;
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
      } // end last week
      } // end last month
   }
}

switch($_GET['lang']) {
   case 'fr':
   case 'FR':
      $buttonname1="Tous les temps";
      $buttonname2="Mensuel";
      $buttonname3="Hebdomadaire";
      $colname1="Nom d'utilisateur";
      $colname5="Total";
      break;
   case 'sp':
   case 'SP':
      $buttonname1="Todo el tiempo";
      $buttonname2="Mensual";
      $buttonname3="Semanal";
      $colname1="Usuario";
      $colname5="Total";
      break;
   case 'ru':
   case 'RU':
      $buttonname1="Небывалый";
      $buttonname2="За месяц";
      $buttonname3="За неделю";
      $colname1="Имя пользователя";
      $colname5="общий";
      break;
   case 'ro':
   case 'RO':
      $buttonname1="Tot timpul";
      $buttonname2="Lunar";
      $buttonname3="Săptămânal";
      $colname1="Nume utilizator";
      $colname5="Total";
      break;
   case 'he':
   case 'HE':
      $buttonname1="של כל זמנים";
      $buttonname2="חודשי";
      $buttonname3="שבועי";
      $colname1="שם משתמש";
      $colname5="סך הכל";
      break;
   case 'pt':
   case 'PT':
      $buttonname1="Todos os tempos";
      $buttonname2="Mensal";
      $buttonname3="Semanal";
      $colname1="Usuário";
      $colname5="Total";
      break;
   case 'cns':
   case 'CNS':
      $buttonname1="空前的";
      $buttonname2="每月排名";
      $buttonname3="每周排名";
      $colname1="用户名";
      $colname5="总";
      break;
   case 'cnt':
   case 'CNT':
      $buttonname1="空前的";
      $buttonname2="每月排名";
      $buttonname3="每週排名";
      $colname1="用戶名";
      $colname5="總";
      break;
   case 'en':
   case 'EN':
   default:
      $buttonname1="All-time";
      $buttonname2="Monthly";
      $buttonname3="Weekly";
      $colname1="Username";
      $colname5="Total";
}

?>
<div id="ranking">

<div id="rankingselect">
<?
echo "<button id=\"showall\" class=\"selectButton\">" . $buttonname1 . "</button>\n";
echo "<button id=\"showmonth\" class=\"selectButton\">" . $buttonname2 . "</button>\n";
echo "<button id=\"showweek\" class=\"selectButton\">" . $buttonname3 . "</button>\n";
?>
</div>

<div id="alltime">
<table cellpadding="0" cellspacing="0" border="0" class="display dataTable" id="rankingtable" width="100%">
<thead>
<?
echo "<tr><td width=\"3%\">&nbsp;</td><td>" . $colname1 . "</td><td><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"></td><td><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"></td><td><img class=\"startable\" src=\"img/1star.png\"></td><td>" . $colname5 . "</td></tr>\n";
?>
</thead>
<tbody>
<?php
foreach ($alltimeranking as $user => $info) {
    	$total = $info['total'][3] + $info['total'][2] + $info['total'][1];
        if ($total >= 100) {
           echo "<tr><td class=\"center\"></td><td>" . $user . "</td><td>" . $info['total'][3] . "</td><td>" . $info['total'][2] . "</td><td>" . $info['total'][1] . "</td><td>" . $total . "</td></tr>\n";
        }
};
?>
</tbody>
</table>
</div>

<div id="monthly">
<table cellpadding="0" cellspacing="0" border="0" class="display dataTable" id="rankingtable" width="100%">
<thead>
<?
echo "<tr><td width=\"3%\">&nbsp;</td><td>" . $colname1 . "</td><td><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"></td><td><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"></td><td><img class=\"startable\" src=\"img/1star.png\"></td><td>" . $colname5 . "</td></tr>\n";
?>
</thead>
<tbody>
<?php
foreach ($monthranking as $user => $info) {
   $total = $info['total'][3] + $info['total'][2] + $info['total'][1];
   echo "<tr><td class=\"center\"></td><td>" . $user . "</td><td>" . $info['total'][3] . "</td><td>" . $info['total'][2] . "</td><td>" . $info['total'][1] . "</td><td>" . $total . "</td></tr>\n";
};
?>
</tbody>
</table>
</div>

<div id="weekly">
<table cellpadding="0" cellspacing="0" border="0" class="display dataTable" id="rankingtable" width="100%">
<thead>
<?
echo "<tr><td width=\"3%\">&nbsp;</td><td>" . $colname1 . "</td><td><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"></td><td><img class=\"startable\" src=\"img/1star.png\"><img class=\"startable\" src=\"img/1star.png\"></td><td><img class=\"startable\" src=\"img/1star.png\"></td><td>" . $colname5 . "</td></tr>\n";
?>
</thead>
<tbody>
<?php
foreach ($weekranking as $user => $info) {
   $total = $info['total'][3] + $info['total'][2] + $info['total'][1];
   echo "<tr><td class=\"center\"></td><td>" . $user . "</td><td>" . $info['total'][3] . "</td><td>" . $info['total'][2] . "</td><td>" . $info['total'][1] . "</td><td>" . $total . "</td></tr>\n";
};
?>
</tbody>
</table>
</div>

</div>

