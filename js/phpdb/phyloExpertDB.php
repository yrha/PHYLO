<?php
include './dbExpertConnector.php';
include './xml2json/xml2json.php';
include '../../salt.php';
error_reporting(0);
//change above to fix path as needed
//note that systemComponents.php will need the correct database information

$mode = $_POST["mode"];

// Mode is type of query to make. 
// You can probably remove this and make the below figure it out based on what variables are given.
$id = $_POST["id"];
$diff = $_POST["diff"];
$align = $_POST["align"];
$user = $_POST["user"];
$score = $_POST["score"];
$bioid = $_POST["bioid"];
$bioscore = $_POST["bioscore"];
$tree = $_POST["tree"];
$treestring = $_POST["treestring"];
$pass = $_POST["pass"];
$email = $_POST["email"];
$network = $_POST["network"];
$network_id = $_POST["network_id"];
//$message = $_POST["message"];
//$browser = $_POST["browser"];

switch ($mode) {
		// Mode 0 is to handle error logging
//	case 0: 
//		$connector = new dbConnector();
//		$message = $connector->escapestring($message);
//		$browser = $connector->escapestring($browser);
//		$connector->query("INSERT INTO error('message','browser') VALUES ('$message','browser')");
//		break;
		// Mode 1 is getting a random level of a given difficulty
	case 1:
		$connector = new dbConnector();
		$diff = $connector->escapestring($diff);
		$result = $connector->query("SELECT level_xml FROM levels WHERE difficulty = $diff AND bio_off = 0 ORDER BY RAND() LIMIT 1");
		$array = $connector->fetchArray($result);
		echo xml2json::transformXmlStringToJson($array['level_xml']);
		break;
		// Mode 2 is getting a level given its ID
	case 2:
		$connector = new dbConnector();
		$id = $connector->escapestring($id);
		$result = $connector->query("SELECT level_xml FROM levels WHERE level_id = $id AND bio_off = 0 LIMIT 1");
		$array = $connector->fetchArray($result);
		echo xml2json::transformXmlStringToJson($array['level_xml']);
		break;
		// Mode 3 is to pipe out the stats for after completing a level.
	case 3:
		$connector = new dbConnector();
		$id = $connector->escapestring($id);
		$connector->query("UPDATE levels SET fail_count = fail_count + 1 WHERE level_id = $id");
		$result = $connector->query("SELECT disease_link,play_count,fail_count,best_score,running_score,highscore_user FROM levels WHERE level_id = $id LIMIT 1");
		$array = json_encode($connector->fetchArray($result));
		echo $array;
		break;
		// Mode 4 is to insert a completed alignment for the level
	case 4:
		$connector = new dbConnector();
		$align = $connector->escapestring($align);
		$id = $connector->escapestring($id);
		$user = $connector->escapestring($user);
		$score = $connector->escapestring($score);
		$date = date("Y-m-d");
		$connector->query("INSERT INTO alignments SET alignment='$align', level_id=$id, user='$user', score=$score, date_submitted='$date'");
		$result = $connector->query("SELECT best_score FROM levels WHERE level_id = $id");
		$array = $connector->fetchArray($result);
		$best = $array[0];
		if( $score >= $best && $user != 'guest') {
			$connector->query("UPDATE levels SET highscore_user = '$user' WHERE level_id = $id");
			$connector->query("UPDATE levels SET best_score = $score WHERE level_id = $id");
		}
		$connector->query("UPDATE levels SET play_count = play_count + 1, running_score = running_score + $score WHERE level_id = $id");
		if( $user != 'guest') {
			$connector->query("UPDATE users SET levels_played = levels_played + 1 WHERE name = '$user'");
		}
		$result = $connector->query("SELECT disease_link,play_count,fail_count,best_score,running_score,highscore_user FROM levels WHERE level_id = $id LIMIT 1");
		$array = json_encode($connector->fetchArray($result));
		echo $array;
		break;
		// Mode 5 is to output general stats for the game
	case 5:
		$connector = new dbConnector();
		$id = $connector->escapestring($id);
		$result = $connector->query("SELECT COUNT(*) FROM levels WHERE play_count>0");
		$tmp = $connector->fetchArray($result);
		$array['levels'] = $tmp[0];
		$result = $connector->query("SELECT COUNT(*) FROM alignments");
		$tmp = $connector->fetchArray($result);
		$array['alignments'] = $tmp[0];
		$result = $connector->query("SELECT COUNT(*) FROM users");
		$tmp = $connector->fetchArray($result);
		$array['users'] = $tmp[0];
		echo json_encode($array);
		break;
		// Mode 6 is to register a new user
	case 6:
		$connector = new dbConnector();
		$user = $connector->escapestring($user);
		$pass = $connector->escapestring(hash("sha512",$salt.$pass));
		$email = $connector->escapestring($email);
                $network = $connector->escapestring($network);
                $network_id = $connector->escapestring($network_id);
		$date = date("Y-m-d");
		$result = $connector->query("SELECT name FROM users WHERE name='$user'");
		$array = $connector->fetchArray($result);
		if (count($array) > 1) {
		  echo "fail";
		} else {
		  $connector->query("INSERT INTO users SET name='$user', password='$pass', email='$email', network='$network', network_id='$network_id', date_joined='$date', last_login='$date', levels_played=0");
		  echo "succ";
		}
		break;
		// Mode 7 is to check user login
	case 7:
		$connector = new dbConnector();
		$user = $connector->escapestring($user);
		$pass = $connector->escapestring($pass);
		$result = $connector->query("SELECT name, password, last_login FROM users WHERE name='$user'");
		$array = $connector->fetchArray($result);
		if (hash("sha512",$salt.$pass) != $array['password']) {
			echo "fail";
		} else {
			$date = date("Y-m-d");
			$connector->query("UPDATE users SET last_login='$date'where name='$user'");
			echo "succ";
		}
		break;
		// Mode 8 returns a boolean to allow access to expert version
	case 8:
                $connector = new dbConnector();
                $user = $connector->escapestring($user);
                $result = $connector->query("SELECT levels_played FROM users WHERE name='$user'");
                $array = $connector->fetchArray($result);
                if ($array['levels_played']>20) {
                        echo "succ";
                } else {
                        echo $user . "/" . $array['levels_played'] . "/fail";
                }
                break;		
                // Mode 9 returns par and highscore of a level
		// FIXME: we assume that id is a valid puzzle --> implement warning
        case 9:
                $connector = new dbConnector();
                $id = $connector->escapestring($id);
                $result = $connector->query("SELECT original_score,best_score FROM levels WHERE level_id=$id");
                $array = $connector->fetchArray($result);
                echo $array['original_score'] . ",". $array['best_score'];
                break;
                // Mode 10 fetchs a bioblock given its ID
        case 10:
                $connector = new dbConnector();
   		$id = $connector->escapestring($id);
		// id syntax: s<id> is for originak bioblocks and x<id> is for submissions
		$prefix = $id[0];
		$suffix = substr($id,1);
		if ($prefix=='s') {
                  $result = $connector->query("SELECT sequences,tree FROM bioblocks WHERE block_id=$suffix");
		} elseif ($prefix=='x') {
		  $result = $connector->query("SELECT sequences,tree FROM expertblocks WHERE block_id=$suffix");
		}
		// then parse
                $array = $connector->fetchArray($result);
		$cleanarray = array();
		$seqarray = json_decode($array['sequences'],true);
		$cleanarray['level'] = array('tree' => $array['tree'], 'sequence' => $seqarray['sequence']);
		echo json_encode($cleanarray);
                break;
		// Mode 11 returns list of open levels with scores
        case 11:
                $connector = new dbConnector();
                $result = $connector->query("SELECT block_id,disease_category,submitter,numseqs,game_par,game_highscore,expertid_highscore FROM bioblocks");
		// build array with block infos
		$myblocktable = array();
		while ($myrow = $connector->fetchArray($result)) {
      		      $newid = $myrow['block_id'];
      		      $myblocktable[$newid] = array();
      		      $myblocktable[$newid]['submitter'] = $myrow['submitter'];
      		      $myblocktable[$newid]['numseqs'] = $myrow['numseqs'];
                      $myblocktable[$newid]['disease_category'] = $myrow['disease_category'];
      		      $myblocktable[$newid]['game_par'] = $myrow['game_par'];
      		      $myblocktable[$newid]['game_highscore'] = $myrow['game_highscore'];
                      $myblocktable[$newid]['expertid_highscore'] = $myrow['expertid_highscore'];
                      $myblocktable[$newid]['play_count'] = $myrow['play_count'];
		};
		echo json_encode($myblocktable);
                break;
		// Mode 12 returns stats of a player
        case 12:
                $connector = new dbConnector();
                $result = $connector->query("SELECT block_id,bioblock_id,numseqs,game_par,submitted_score,game_highscore FROM expertblocks WHERE submitter='$user'");
                // build array with block infos
                $mystatstable = array();
                while ($myrow = $connector->fetchArray($result)) {
                      $newid = $myrow['block_id'];
                      $mystatstable[$newid] = array();
                      $mystatstable[$newid]['bioblock_id'] = $myrow['bioblock_id'];
                      $mystatstable[$newid]['numseqs'] = $myrow['numseqs'];
                      $mystatstable[$newid]['game_par'] = $myrow['game_par'];
                      $mystatstable[$newid]['submitted_score'] = $myrow['submitted_score'];
                      $mystatstable[$newid]['game_highscore'] = $myrow['game_highscore'];
                };
		// infos on bioblocks
                $result2 = $connector->query("SELECT block_id,numseqs,game_par,game_highscore,expertid_highscore,disease_category FROM bioblocks");
                $mystatstable2 = array();
                while ($myrow = $connector->fetchArray($result2)) {
                      $newid = $myrow['block_id'];
                      $mystatstable2[$newid] = array();
                      $mystatstable2[$newid]['numseqs'] = $myrow['numseqs'];
                      $mystatstable2[$newid]['game_par'] = $myrow['game_par'];
                      $mystatstable2[$newid]['game_highscore'] = $myrow['game_highscore'];
                      $mystatstable2[$newid]['expertid_highscore'] = $myrow['expertid_highscore'];
                      $mystatstable2[$newid]['disease_category'] = $myrow['disease_category'];
                };
		$fulloutput = array();
		$fulloutput['submissions']=$mystatstable;
		$fulloutput['bioblocks']=$mystatstable2;
		echo json_encode($fulloutput);
                break;
                // Mode 13 is to insert a new block alignment
        case 13:
                $connector = new dbConnector();
                $align = $connector->escapestring($align);
                $id = $connector->escapestring($id);
                $user = $connector->escapestring($user);
                $score = $connector->escapestring($score);
		$bio_id = $connector->escapestring($bioid);
                $block_tree = $connector->escapestring($tree);		
                $block_treestring = $connector->escapestring($treestring);
                $bio_score = $connector->escapestring($bioscore);
                $date = date("Y-m-d");

		/* FIXME (conflicts may occur) */
		$result=$connector->query("SELECT COUNT(*) FROM expertblocks");
		$firstrow = $connector->fetchArray($result);
		$blockcount=$firstrow[0];
		$newblockid = $blockcount + 1;
		
                /* retrieve basic stats */
                $retrieve = $connector->query("SELECT play_count,disease_link,disease_category,game_par,game_highscore,bio_highscore,numseqs FROM bioblocks WHERE block_id = $bio_id");
                $sarray = $connector->fetchArray($retrieve);
		$numseqs = $sarray['numseqs'];
                $play_count = $sarray['play_count'];
                $disease_link = $sarray['disease_link'];
                $disease_category = $sarray['disease_category'];
		$block_par = $sarray['game_par'];
                $game_highscore = $sarray['game_highscore'];
                $bio_highscore = $sarray['bio_highscore'];
		if ($score > $game_highscore) {
		   $block_highscore = $score;
		} else {
		   $block_highscore = $game_highscore;
		}
		if ($bio_score > $bio_highscore) {
		   $block_full_highscore = $bio_score;
		} else {
		   $block_full_highscore = $bio_highscore;
		}

		/* Determine start score */
                $prefix=$id[0];
                $suffix=substr($id,1);
                if ($prefix=='x') {
                   $buffer = $connector->query("SELECT submitted_score FROM expertblocks WHERE block_id = $suffix");
                   $xarray = $connector->fetchArray($buffer);
                   $start_score = $xarray['submitted_score'];
                } elseif ($prefix=='s') {
		   $start_score = $block_par;    
		}

		/* insert new solution in table */

                $output = $connector->query("INSERT INTO expertblocks SET block_id=$newblockid, numseqs='', sequences='$align', bioblock_id=$bio_id, submitter='$user', submitted_score=$score, tree='$block_tree', treestring='$block_treestring', game_par='$block_par', game_highscore='$block_highscore', origin_score='$start_score', origin_id='$id', submit_time='$date', full_score='$bio_score'");

		/* update bioblock data */
                if( $score > $game_highscore && $user != 'guest') {
                    $connector->query("UPDATE bioblocks SET contributors = concat(contributors,'$user',';') WHERE block_id = $bio_id");
                    $connector->query("UPDATE bioblocks SET game_highscore = $score WHERE block_id = $bio_id");
                    $connector->query("UPDATE bioblocks SET success_count = success_count + 1 WHERE block_id = $bio_id");
                    $connector->query("UPDATE bioblocks SET expertid_highscore = $newblockid WHERE block_id = $bio_id");
		}
                if( $bio_score > $bio_highscore && $user != 'guest') {
                    $connector->query("UPDATE bioblocks SET bio_contributors = concat(bio_contributors,'$user',';') WHERE block_id = $bio_id");
                    $connector->query("UPDATE bioblocks SET bio_highscore = $bio_score WHERE block_id = $bio_id");
                    $connector->query("UPDATE bioblocks SET expertid_bio_highscore = $newblockid WHERE block_id = $bio_id");
                }
                $connector->query("UPDATE bioblocks SET play_count = play_count + 1 WHERE block_id = $bio_id");
                if( $user != 'guest') {
                    $connector->query("UPDATE users SET bio_levels_played = bio_levels_played + 1 WHERE name = '$user'");
                }
		
		/* feedback */

		if (strlen($disease_link)>0) {
		  $disease_name = " (" . $disease_link . ")";
		} else {
		  $disease_name = "";
		}

		$buffer = "<h3>Thank you!</h3>\nYour alignment has been submitted.<br/>\n";
		if ( $score > $game_highscore && $user != 'guest') {
		   $buffer .= "You got the highscore!<br/>";
		}
		$buffer .= "This blocks was associated with a " . $disease_category . " disease" . $disease_name . ".<br/>\n";
		$buffer .= "This blocks has been played " . $play_count . " times, and the highest score is " . $game_highscore . ".</br>\n";
		$buffer .= "Your score is " . $score . ".<br/>\n";
                echo $buffer;
                break;
}
//getCatalogue($user)
//getHighScore($top)

?>
