// Script to capture and analyze Summon search results

 function libGetQueryVariable(variable,query) {
  	if( query ) {
  		var chunks = query.split('?');
  		if( chunks[1] ) {
  			var vars = chunks[1].split('&');
  			for (var i = 0; i < vars.length; i++) {
  				var pair = vars[i].split('=');
  				if (decodeURIComponent(pair[0]) == variable) {
  					return decodeURIComponent(pair[1]);
  				}
  			}
        if(chunks[2]) {
          var vars = chunks[2].split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
          }
        }
        }
        console.log('Query variable %s not found', variable);
  		}
  	}
}

	// Define variables
	var databases = '', resultsNumber = '', topics = '', guides = '', relatedLibrarian = '', expansionTerms = '', spellingCorrection = '', hasTopic = false, topicSummary = '', topicTitle = '', topicSource = '';

	// Get search query
	 var searchQuery = libGetQueryVariable('q', window.location.href);

	 if((typeof searchQuery === 'undefined') || (searchQuery == null)) {
          searchQuery = encodeURIComponent(libGetQueryVariable('s.q', window.location.search));
	 }

	// Total number of results
	var resultsPhrase = document.querySelector('.metadata div[ng-show="item.recordCount"] span').textContent;
	var totalResults = resultsPhrase.split(' results sorted by');
	resultsNumber = encodeURIComponent(totalResults[0]);
	
	// Database Recommendations
	if($('.databaseRecommendations').length > 0) {
		var recommendedDatabases = document.querySelectorAll('.databaseRecommendations ul a');
		recommendedDatabases.forEach(function(databaseName) {
  				databases = databases + ',' + encodeURIComponent(databaseName.textContent);
		});
	}

	// Related Topics
	if($('#rightPane .relatedTopics').length > 0) {
		var recommendedTopics = document.querySelectorAll('#rightPane .relatedTopics ul a'); 
		recommendedTopics.forEach(function(topicName) {
  				topics = topics + ',' + encodeURIComponent(topicName.textContent);
		});
	}

	// Related Guides
	if($('#rightPane .researchGuides').length > 0) {
		var researchGuides = document.querySelectorAll('#rightPane .researchGuides ul a');
		researchGuides.forEach(function(guideName) {
  				guides = guides + ',' + encodeURIComponent(guideName.textContent);
		});
	}

	// Recommended Librarian
	if($('#rightPane .relatedLibrarian').length > 0) {
		relatedLibrarian = encodeURIComponent(document.querySelector('#rightPane .relatedLibrarian .librarianInfo .name').textContent);
	}

	// Expansion Terms
	if($('.expansionTerms').length > 0) {
		expansionTerms = encodeURIComponent(document.querySelector('.expansionTerms strong').textContent);
	}

	// Did You Mean
	if($('.didYouMean').length > 0) {
		spellingCorrection = encodeURIComponent(document.querySelector('.didYouMean a').textContent);
	}

	// Topic Explorer
	if(($('#rightPane .topicSummary').length > 0) && ($('#rightPane .topicSummary').is(':visible'))) {

		hasTopic = true;
		topicTitle = encodeURIComponent(document.querySelector('.topicSummary h4').textContent);
		topicSource = encodeURIComponent(document.querySelector('.topicSummary h3').textContent);
		topicSummary = encodeURIComponent(document.querySelector('.topicSummary .snippet').textContent);
	
	}

	// Facets
	 if((typeof libGetQueryVariable === 'undefined') || (libGetQueryVariable == null)) {
		var facets = encodeURIComponent(libGetQueryVariable('fvf', window.location.href));
	} else {
		var facets = '';
	}

	var searchAuditPost = document.createElement('img');
	searchAuditPost.alt = "";
	searchAuditPost.style.display = 'none';
	searchAuditPost.src = 'https://localhost:8888/summon2.0/search_audit.php?q=' + searchQuery + '&r=' + resultsNumber + '&d=' + databases + '&t=' + topics + '&g=' + guides + '&l=' + relatedLibrarian + '&x=' + expansionTerms + '&s=' + spellingCorrection + '&te=' + hasTopic + '&tet=' + topicTitle + '&tes=' + topicSource + '&tesum=' +topicSummary + '&f=' +facets;
	document.body.appendChild(searchAuditPost);