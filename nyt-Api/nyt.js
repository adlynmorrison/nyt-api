//JavaScript Document
//http://iam.colum.edu/students/Adlyn.Morrison/ASWM/week%2014/index.html
//To allow outside scripts to access pieces of our sandbox, we 
//need to geive it a name. This name should be something you're 
//pretty sure won't be used by any other script you might include
//on your site.

//this function must exist in the global sandbox!
//do not change the name of this function!
var svc_search_v2_articlesearch = function(json_data) {
    
	//send the data in to your sandbox to do the processing
    nyt.display_article_data(json_data);
};

//sandbox
var nyt = (function($) {
    //set up article API key
	var articles_api_key = '01fe42f57b99025c0c429af864459988:11:62091587';
	
	//set up API movei review key
	var movie_reviews_api_key = '0ed7cadb52ced3e50a7d8a446d478b8f:2:62091587';
	
	//define search box
	var articles_search = $('#articles-search');
	var movie_reviews_search = $('#movie-reviews-search');
	
	//define submit buttons
	var $articles_submit = $('#articles-submit');
	var $movies_submit = $('#movies-submit');
	
	//define article variables
	var _$article_container = $('#articles');
	var _$srticle_headline;
	var _$article_pub_date;
	var _$article_main;
	var _$article_source;
	var _$article_word_count;
	var _$article_template = _.template($('#articles-template').html());
	
	//define movie variables	
	var _$movies_container = $('#movie-reviews');
	var _$movies_headline;
	var _$movies_byline;
	var _$movies_display_title;
	var _$movies_mpaa_rating;
	var _$movies_publication_date;
	var _$movies_summary_short;
	var _$movies_template = _.template($('#movies-template').html());
	
	//set up a click handler for each article
	//private variable
    var _setup_event_listener = function() {
    	//article click handler
		$('#articles-submit').on('click', function(e) {
            e.preventDefault();
            nyt.get_article_data(this.href);
        });
		//movie click handler
		$('#movies-submit').on('click', function(e) {
            e.preventDefault();
			nyt.get_movies_data(this.href);
		});
    };
	
	//this function does the actual processing of the article data
        var display_articles = function(json_data) {
			var article_values, article_markup;
			console.log(json_data);
			//loop through the data and display it on the page
			for (var i = 0; i < json_data.response.docs.length; i++) {
				article = json_data.response.docs[i];
				
				article_values ={
					headline: article.headline.main,
					pub_date: article.pub_date,
					main: article.lead_paragraph,
					source: article.source,
					word_count: article.word_count
				};

				article_markup = _$article_template(article_values);
				
				//append the markup to the container
				_$article_container.append(article_markup);
			}
		
    };

	//this function does the actual processing of the movie data
        var display_movies_data = function(json_data) {
			//loop through the data and display it on the page
			for (var i = 0; i < json_data.results.length; i++) {
				movies = json_data.results[i];
				
				
				movies_values ={
					headline: movies.headline,
					byline: movies.byline,
					display_title: movies.display_title,
					mpaa_rating: movies.mpaa_rating,
					publication_date: movies.publication_date,
					summary_short: movies.summary_short
					
				};

				movies_markup = _$movies_template(movies_values);
				
				//append the  markup to the container
				_$movies_container.append(movies_markup);
			}
		};

    return {
		init: function(){
			//call our private function to set up the event listener articles
			_setup_event_listener();
		},
		
		//get data from article api
		get_article_data: function() {
			//article script
			$.getScript('http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?q=' + articles_search.val() + '&page=1&sort=newest&api-key=' + articles_api_key + '&callback=svc_search_v2_articlesearch');
		},
		
		display_article_data: function(json_data){
			display_articles(json_data);
		},
		
		//get data from movies review api
		get_movies_data: function(){
			//movie script
		 	$.getScript('http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query=' + movie_reviews_search.val() + '&order=by-opening-date&api-key=' + movie_reviews_api_key + '&callback=nyt.display_movie_reviews');
		},
		//display movie reviews
		display_movie_reviews: function(json_data){
			display_movies_data(json_data);
		}
	};
				
})(window.jQuery);
//initialize sandbox
nyt.init();