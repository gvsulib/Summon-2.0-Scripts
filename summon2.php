<?php
header("Access-Control-Allow-Origin: https://gvsu.summon.serialssolutions.com");
header("Access-Control-Allow-Origin: http://gvsu.summon.serialssolutions.com");

// File that defines database connection parameters
include('config.php');

$db = new mysqli($db_host, $db_user, $db_pass, $db_database);
if ($db->connect_errno) {
	printf("Connect failed: %s\n", $db->connect_error);
	exit();
}

if(isset($_REQUEST['q']) && $_REQUEST['q'] != "") { // Search term is set, it's not blank

	$now = time();

	$search_term = htmlspecialchars($db->real_escape_string(strtolower(urldecode($_REQUEST['q']))));
	$search_results = $db->real_escape_string(urldecode($_REQUEST['r']));

	// Insert search query into database
	$db->query("INSERT INTO query VALUES('','$search_term', '$search_results', '$now')") or die($db->error);

	// Get query_id for that search term
	$new_id = $db->insert_id;

	// Check for Topic Explorer mapping
	if($_REQUEST['te'] == true) { // Save topic explorer data

		// Watch out for naughty bits
		$topic = htmlspecialchars($db->real_escape_string($_REQUEST['tet']));
		$topicFrom = htmlspecialchars($db->real_escape_string($_REQUEST['tes']));
		$topicSummary = htmlspecialchars($db->real_escape_string($_REQUEST['tesum']));

		$db->query("INSERT INTO topic_explorer VALUES ('', '$new_id', '$topic', '$topicFrom', '$topicSummary')") or die($db->error);

	}

	
	// Check for Database Recommendations
	if(isset($_REQUEST['d']) && (strlen($_REQUEST['d']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$database_text = htmlspecialchars($db->real_escape_string($_REQUEST['d']));

		$db->query("INSERT INTO recommended_databases VALUES ('', '$new_id', '$database_text')") or die($db->error);

	}

	// Check for query expansion
	if(isset($_REQUEST['x']) && (strlen($_REQUEST['x']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$expansion = htmlspecialchars($db->real_escape_string($_REQUEST['x']));

		$db->query("INSERT INTO query_expansion VALUES ('', '$new_id', '$expansion')") or die($db->error);

	}

	// Check for spelling suggestions
	if(isset($_REQUEST['s']) && (strlen($_REQUEST['s']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$spelling = htmlspecialchars($db->real_escape_string($_REQUEST['s']));

		$db->query("INSERT INTO spelling VALUES ('', '$new_id', '$spelling')") or die($db->error);

	}

	// Check for facets
	if(isset($_REQUEST['f']) && (strlen($_REQUEST['f']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$facets = htmlspecialchars($db->real_escape_string($_REQUEST['f']));

		$db->query("INSERT INTO facets VALUES ('', '$new_id', '$facets')") or die($db->error);

	}

	// Check for recommended librarians
	if(isset($_REQUEST['l']) && (strlen($_REQUEST['l']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$librarian = htmlspecialchars($db->real_escape_string($_REQUEST['l']));

		$db->query("INSERT INTO related_librarians VALUES ('', '$new_id', '$librarian')") or die($db->error);

	}

	// Check for related topics
	if(isset($_REQUEST['t']) && (strlen($_REQUEST['t']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$related_topic = $db->real_escape_string($_REQUEST['t']);

		$db->query("INSERT INTO related_topics VALUES ('', '$new_id', '$related_topic')") or die($db->error);

	}

	// Check for related guides
	if(isset($_REQUEST['g']) && (strlen($_REQUEST['g']) > 0)) { // Save topic explorer data

		// Watch out for naughty bits
		$guides = htmlspecialchars($db->real_escape_string($_REQUEST['g']));

		$db->query("INSERT INTO related_guides VALUES ('', '$new_id', '$guides')") or die($db->error);

	}

	echo 'Search saved.';

} else {
	
	echo 'No data ' . $_REQUEST;
}



?>
