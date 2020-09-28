<?php
 header("Access-Control-Allow-Origin: *");
 date_default_timezone_set('America/Detroit'); // Set to Eastern Time


 // Let's record another RefWorks export

 function saveData($list, $file) {

	$fp = fopen($file, 'a');

    	fputcsv($fp, $list);

	fclose($fp);
}

$current_date = date("m-d-Y");
$current_time = date("ga");

$refworks_array = array($current_date, $current_time, 1);

saveData($refworks_array, '/var/www/prod/labs/summon2.0/refworks.csv');