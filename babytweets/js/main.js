function addTweet( a_tweetData )
{
	var tweetList = $('#tweets');

	var tweetHtml = '<li class="list-group-item"><span class="label label-default">'+ a_tweetData.user.screen_name +'</span> ' + a_tweetData.text + '</li>';
	tweetList.append( tweetHtml );
	//alert(a_tweetData);
}

$(function() {
	OAuth.initialize('7gEJMMbhU_ez7QC_XSKBfOIMzIA');
	OAuth.popup('twitter', function(err, res) {
	    if (err) {
	        // TODO: do something with error
	    	alert(err.message);
	    }
	    else
	    {
		    res.get('/1.1/account/verify_credentials.json')
		       .done(function(data) {
		       	$('#profile').html('<img src="' + data.profile_image_url + '"> ' + data.screen_name);

		        //alert('Hello ' + data.name)
		    })

			res.get('/1.1/statuses/home_timeline.json?count=2')
		       .done(function(data) {
		        //alert('Hello ' + data.name);

		        for (i = 0; i < data.length; ++i) {
		        	var tweetData = data[i];
		        	addTweet(tweetData);
				}
		    })
	    }
    
})

});