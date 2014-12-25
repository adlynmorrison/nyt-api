// JavaScript Document
//To allow outside scripts to access pieces of our sandbox, we 
//need to geive it a name. This name should be something you're 
//pretty sure won't be used by any other script you might include
// on your site.

	var movies = (function($) {
		//start
		'use strict';
		var movie_reviews_api_key = '0ed7cadb52ced3e50a7d8a446d478b8f:2:62091587';
		var search = '';
			
		var display_movie_reviews = function(json_data){
		
	};
		
	$.getScript('http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query=' + search + '&order=by-opening-date&api-key=' + movie_reviews_api_key + '&callback=display_movie_reviews');

	var svc_search_v2_articlesearch = function(json_data) {
    // send the data in to your sandbox to do the processing
    MySandbox.display_article_data(json_data);
	};
});
		

	var articles = (function($) {
    var articles_api_key = '01fe42f57b99025c0c429af864459988:11:62091587';
    var search = '';
	var display_articles = function(json_data){
	
	};

    $.getScript('http://api.nytimes.com/svc/search/v2/articlesearch.jsonp?q=' + search + '&page=1&sort=newest&api-key=' + articles_api_key + '&callback=svc_search_v2_articlesearch');

    return {
        // this function does the actual processing of the article data
        display_article_data: function(json_data) {
            // loop through the data and display it on the page
        }
    };
	
$('#form-submit').on('click', function(e) {
	e.preventDefault();
	
	$.ajax({
		url:'/ajaxservice/getdata',
		type: 'POST',
		data: $('#myform').serialize(),
		dataType: 'json',
		success: function(data, status, xhr) {
			
		},
		error: function(xhr, status, error) {
      		console.log(error);
    	}
	});
});
})(window.jQuery);