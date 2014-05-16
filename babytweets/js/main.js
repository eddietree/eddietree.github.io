function addTweet( a_tweetData )
{
	var tweetList = $('#tweets');

	var textMassaged = replaceURLWithHTMLLinks(a_tweetData.text);
	var tweetHtml = '<li class="list-group-item tweet"><a href="https://twitter.com/'+ a_tweetData.user.screen_name +'" class="btn btn-primary btn-xs">@'+ a_tweetData.user.screen_name +'</a> '+textMassaged+'</li>';
	
	//var tweetHtml = '<li class="list-group-item tweet"><a href="https://twitter.com/'+ a_tweetData.user.screen_name +'"><img class="tweet-profile-pic" src="'+a_tweetData.user.profile_image_url+'"></a> '+textMassaged+'</li>';
	//var tweetHtml = '<li class="list-group-item"><span class="label label-default">'+ a_tweetData.user.screen_name +'</span> ' + a_tweetData.text + '</li>';
	tweetList.append( tweetHtml );
	//alert(a_tweetData);
}

function replaceHTMLwithTwitterClickable(text)
{
	text = text.replace(/@(\S+)/g, '<a href="https://twitter.com/#!/$1">@$1</a>')
           .replace(/#(\S+)/g, '<a href="https://twitter.com/#!/%23$1">#$1</a>');

    return text;
}

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
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
		       	$('#profile').html('<img src="' + data.profile_image_url + '"> @' + data.screen_name);

		        //alert('Hello ' + data.name)
		    })

			res.get('/1.1/statuses/home_timeline.json?count=50')
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