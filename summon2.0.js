$(document).ready(function() {

  /* New Custom code for 2016 UI refresh */

  setTimeout(function() {
    libMyScope = angular.element('html').scope();
    libInitWithScope( );
  }, 1000);

  // Update CSS

  $('head').append('<style>.linksMenu .siteLinks { background-color: #069 !important;} .toggleTopicExplorer { display: none !important; } .logo {max-height: 48px !important;bottom: .5em;position: relative;} #detailSummary .documentActions a[href*="illiad"]:after { content: " from Another Library";} #detailSummary .documentActions a[href*="library.catalog"] { background: #069 !important;color: white !important;} #detailSummary .documentActions a[href*="library.catalog"]:after {content: " GVSU Copy";}.clearRefinementsContainer {background: #88b3da;font-size: 1.1em;font-weight: bold;padding: 1em;text-align: center;}#library-chat a { padding: 6px 12px !important;}</style>');

  setTimeout(function() {
  
    // Add Chat Widget 

    var li = document.createElement('div');
      li.id = 'library-chat';
      var libChatDiv = document.createElement('a');
      libChatDiv.appendChild(document.createTextNode('Ask a Question'));
      libChatDiv.className = 'btn btn-primary';
      li.appendChild(libChatDiv);
      document.querySelector('.springshareV2Btn').appendChild(li);
      var chatWindow = function() {
        window.open('https://prod.library.gvsu.edu/labs/chat/?summon', 'Ask a Question', 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,left=20,top=20,width=460,height=460');
      }
      if (libChatDiv.addEventListener) {
        libChatDiv.addEventListener('click', chatWindow, false);
      } else {
        libChatDiv.attachEvent('onclick', chatWindow);
      }
      console.log('Added the chat button.');

    /// Make the logo bigger

    $(".siteHeader img.img-responsive.logo").attr("src", "https://www.gvsu.edu/includes/topbanner/3/gvsu_logo.png");
      console.log('Made the logo bigger.');

    // Accessibility add-ons : title elements for confusing icons

    $('.icons-sprite.icons-Save2x').parent('button').attr('title','Save this item');
    $('.icons-sprite.icons-Cite2x').parent('button').attr('title','Cite this item');
    $('.icons-sprite.icons-Email2x').parent('button').attr('title','Email this item');

    // Fix the broken RefWorks link
    /*
    $('.flowLogin').parent('div.ng-scope').html('<a href="https://refworks.proquest.com">RefWorks Log In</a>');
    console.log('Swapped out broken RefWorks login links until ExLibris gets around to fixing them. PQ Ticket #03361447 , EL Ticket #00518647 ');

    */

  }, 2000);

  setTimeout(function() {
      $('.siteLinks').find('.flowLogin').hide();
          console.log('Hid broken RefWorks login in menu until ExLibris gets around to fixing them. PQ Ticket #03361447 , EL Ticket #00518647 ');

  }, 4500);

  function melHelper() {


if($('ul.facetValues li.applied a').attr('title') === 'Book / eBook') {
  console.log('eBook selected');
  // Check for Best bets or database recommendations

  var firstResult = $('#results > div.inner > ul.list-unstyled > li:nth-child(2) div').attr('class');
  var searchTerms = $('input#searchBox_32').val();

  var MeLhint = '<li class="ng-scope"><div class="mel_hint"> <h3>Don&#8217;t see the book you&#8217;re looking for?</h3> <p>You can borrow items from over 400 Michigan libraries, delivered free to GVSU.</p><p> <a href="https://elibrary.mel.org/search/a?searchtype=X&searcharg=' + searchTerms + '&SORT=D&submit=Submit" class="btn btn-primary mich">Search Michigan Libraries</a></p> </div> <style> div.mel_hint {background-color:#88b3da; padding:1em;} .mich { background: url("//library.catalog.gvsu.edu/screens/libicon-016.png") no-repeat 4% 30%;padding-left:36px;background-color:#eeeeee;}</style> </li>';

  if(firstResult === 'documentSummary') {
    // Insert the hint before the second list item recommendation

    $('#results > div.inner > ul.list-unstyled > li:nth-child(2)').before(MeLhint);

  } else {
    // Insert hint after the second list item (there is a best bet or database recommendation)

    $('#results > div.inner > ul.list-unstyled > li:nth-child(2)').after(MeLhint);
  }

} else {
  console.log('No book filter');
}
  }


  function libInitWithScope( ){
      console.log('initialising...');


      // WATCH FOR RESULTS FEED CHANGES...
      libMyScope.$watchCollection('feed', function(){
          // give AngularJS time to update the DOM
          setTimeout(function() {
            libUpdateResultsPage();
            // Script to capture and analyze Summon search results


            // Check to make sure the book helper isn't already on there
            if($('.mel_hint').length === 0) {
              melHelper();
            }

/*
  // Define variables
  var databases = '', resultsNumber = '', topics = '', guides = '', relatedLibrarian = '', expansionTerms = '', spellingCorrection = '', hasTopic = false, topicSummary = '', topicTitle = '', topicSource = '';

  console.log('Recording search parameters...');

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
  searchAuditPost.src = 'https://prod.library.gvsu.edu/labs/summon2.0/summon2.php?q=' + searchQuery + '&r=' + resultsNumber + '&d=' + databases + '&t=' + topics + '&g=' + guides + '&l=' + relatedLibrarian + '&x=' + expansionTerms + '&s=' + spellingCorrection + '&te=' + hasTopic + '&tet=' + topicTitle + '&tes=' + topicSource + '&tesum=' +topicSummary + '&f=' +facets;
  document.body.appendChild(searchAuditPost);
    */
          }, 2000);

        console.log('Scope.feed changed! - loading finished');
      });

  }

  function libUpdateResultsPage() {

      /* Tell Zotero new COinS records have been created */
      try {
        var libZoteroEvent = document.createEvent('HTMLEvents');
        libZoteroEvent.initEvent('ZoteroItemUpdated', true, true);
        document.dispatchEvent(libZoteroEvent);
      }
      catch(err) {
        console.log('Zotero error trapped');
      }
  }

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

});