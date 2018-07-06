<?php

// Pull Summon search results for easy viewing

include('config.php');

$db = new mysqli($db_host, $db_user, $db_pass, $db_database);
if ($db->connect_errno) {
	printf("Connect failed: %s\n", $db->connect_error);
	exit();
}

if(isset($_REQUEST['start'])) {
	$start = $_REQUEST['start'];
} else {
	$start = 0;
}

$search_results = $db->query("SELECT t.te_source, t.te_text, t.te_title, q.query_id, q.query, q.query_results
							FROM topic_explorer as t, query as q, related_topics as r
							WHERE q.query_id = t.query_id
							
							GROUP BY q.query
							ORDER BY q.query_id ASC
							LIMIT $start, 500") or die($db->error);

/*
$search_results = $db->query("SELECT t.te_source, t.te_text, t.te_title, q.query_id, q.query, q.query_results, d.database_names, e.query_expansion, g.guides, l.librarian, r.topics, s.spelling
							FROM topic_explorer as t, query as q, spelling as s, related_topics as r, related_librarians as l, related_guides as g, recommended_databases as d, query_expansion as e
							WHERE q.query_id = t.query_id
							OR q.query_id = s.query_id
							OR q.query_id = r.query_id
							OR q.query_id = l.query_id
							OR q.query_id = g.query_id
							OR q.query_id = d.query_id
							OR q.query_id = e.query_id
							GROUP BY q.query
							ORDER BY q.query_id ASC
							LIMIT $start, 100") or die($db->error);
					*/

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Summon Searches with Supporting Algorithmic Results</title>

	<style>
	table { 
  width: 100%; 
  border-collapse: collapse; 
}

tr:nth-of-type(odd) { 
  background: #eee; 
}
th { 
  background: #333; 
  color: white; 
  font-weight: bold; 
}
td, th { 
  padding: 6px; 
  border: 1px solid #ccc; 
  text-align: left; 
} 

.selected {
	background-color: #c09853 !important;
}

tr.link-hover:hover {
	background-color: #fcf8e3 !important;
}

tr.link-hover:hover td:nth-child(1) {

background-image: url(link.png);
background-repeat: no-repeat;
background-position: 75%;

}


@media 
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {

	
	table, thead, tbody, th, td, tr { 
		display: block; 
	}
	
	
	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	tr { border: 1px solid #ccc; }
	
	td { 
		
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 50%; 
	}
	
	td:before { 
		
		position: absolute;
		
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
	
	td:nth-of-type(1):before { content: "Row"; }
	td:nth-of-type(2):before { content: "Search"; }
	td:nth-of-type(3):before { content: "Results"; }
	td:nth-of-type(4):before { content: "Topic"; }
	td:nth-of-type(5):before { content: "Source"; }
	td:nth-of-type(6):before { content: "Summary"; }
	td:nth-of-type(7):before { content: "Expansion"; }
	td:nth-of-type(8):before { content: "Databases"; }
	td:nth-of-type(9):before { content: "Topics"; }
	td:nth-of-type(10):before { content: "Spelling"; }
	td:nth-of-type(11):before { content: "Guides"; }
	td:nth-of-type(12):before { content: "Librarians"; }
	 }
	
}

	</style>

</head>
<body>

<table>
	<thead>
	  <tr>
	  	<th>Row Number</th>
		<th>Search Query</th>
		<th>Results</th>
		<th>Topic Title</th>
		<th>Topic Source</th>
		<th>Topic Summary</th>
		<!--th>Query Expansion</th>
		<th>Database Names</th-->
		<th>Related Topics</th>
		<!--th>Spelling Correction</th>
		<th>Related Guides</th>
		<th>Related Librarians</th-->
		
	  </tr>
	</thead>
	<tbody>

<?php 

$i = 1;

if($search_results) {
	while($row = $search_results->fetch_assoc()) {
		$query_id = $row['query_id'];
		echo '<tr id="' . $i . '">';
			echo '<td>' . $i . '</td>';
			echo '<td>' . $row['query'] . '</td>';
			echo '<td>' . $row['query_results'] . '</td>';
			echo '<td>' . $row['te_title'] . '</td>';
			echo '<td>' . $row['te_source'] . '</td>';
			echo '<td>' . $row['te_text'] . '</td>';

			// Toss in a db call here to see if it's faster than my slow calls
			$topics_query = $db->query("SELECT topics FROM related_topics WHERE topics.query_id = '$query_id' LIMIT 1");
			if($topics_query->num_rows > 0) {
				while($topic_row = $topics_query->fetch_assoc()) {
					echo '<td>' . $topic_row['topics'] . '</td>';
				}
			}


			/*
			echo '<td>' . $row['query_expansion'] . '</td>';
			echo '<td>' . $row['database_names'] . '</td>';*/
			/*echo '<td>' . $row['spelling'] . '</td>';
			echo '<td>' . $row['guides'] . '</td>';
			echo '<td>' . $row['librarians'] . '</td>';*/
			
		echo '</tr>';
		$i++;
	}
}

?>
	</tbody>
</table>


<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>

$('tr').css('cursor', 'pointer');
$('tr').addClass('link-hover');

$('tr').click(function() {

	// Get id
	var rowID = $(this).attr('id');
	console.log(rowID);

	// Remove previous highlight classes
	$('tr').removeClass('selected');

	$(this).addClass('selected');

	window.location.hash = rowID;

});

</script>


</body>
</html>