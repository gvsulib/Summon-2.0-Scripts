$(document).ready(function() {

  /* New Custom code for 2016 UI refresh */

  setTimeout(function() {
    libMyScope = angular.element('html').scope();
    libInitWithScope( );
  }, 1000);

  // Update CSS

  $('head').append('<style>.linksMenu .siteLinks { background-color: #069 !important;} .logo {max-height: 48px !important;bottom: .5em;position: relative;} #detailSummary .documentActions a[href*="illiad"]:after { content: " from Another Library";} #detailSummary .documentActions a[href*="library.catalog"] { background: #069 !important;color: white !important;} #detailSummary .documentActions a[href*="library.catalog"]:after {content: " GVSU Copy";}.clearRefinementsContainer {background: #88b3da;font-size: 1.1em;font-weight: bold;padding: 1em;text-align: center;}#library-chat a { padding: 6px 12px !important;}</style>');

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
    $('.flowLogin').parent('div.ng-scope').html('<a href="https://refworks.proquest.com">RefWorks Log In</a>');
    $('.siteLinks').find('.flowLogin').parent('div.ng-scope')..html('<a href="https://refworks.proquest.com">RefWorks Log In</a>');
    console.log('Swapped out broken RefWorks login links until ExLibris gets around to fixing them. PQ Ticket #03361447 , EL Ticket #00518647 ');

  }, 1000);


  function libInitWithScope( ){
      console.log('initialising...');

      // WATCH FOR RESULTS FEED CHANGES...
      libMyScope.$watchCollection('feed', function(){
          // give AngularJS time to update the DOM
          setTimeout(function() {
            libUpdateResultsPage();
          }, 1000);
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

});