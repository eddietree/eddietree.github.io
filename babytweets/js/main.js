var g_maxTweetId = 12345;
var g_oauthResult = null;

function addTweet( a_tweetData )
{
	var tweetList = $('#tweets');
	var textMassaged = replaceURLWithHTMLLinks(a_tweetData.text);
	var tweetHtml = '<li class="list-group-item tweet"><div class="user-name"><a href="https://twitter.com/'+ a_tweetData.user.screen_name +'" class="btn btn-primary btn-xs">@'+ a_tweetData.user.screen_name +'</a></div> '+textMassaged+'</li>';
	
	if ( a_tweetData.id > g_maxTweetId )
	{
		g_maxTweetId = a_tweetData.id;
	}

	var tweetItem = $(tweetHtml);
	tweetList.append( tweetItem );

	tweetItem.fadeIn( "slow" );
}

function processTweetLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    text = text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
    exp = /(^|\s)#(\w+)/g;
    text = text.replace(exp, "$1<a href='http://search.twitter.com/search?q=%23$2' target='_blank'>#$2</a>");
    exp = /(^|\s)@(\w+)/g;
    text = text.replace(exp, "$1<a href='http://www.twitter.com/$2' target='_blank'>@$2</a>");
    return text;
}

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}

function queryGetTweets( a_num_tweets )
{
	g_oauthResult.get('/1.1/statuses/home_timeline.json?count='+a_num_tweets+'&since_id='+g_maxTweetId)
       .done(function(data) {

       	console.log("Grabbed " + data.length + " tweets!" );

        for (i = 0; i < data.length; ++i) {
        	var tweetData = data[i];
        	addTweet(tweetData);
		}
    });
}

function pingTwitterForTweets()
{
	var numTweetsToPing = 20;
	var numMsWait = 10000;

	queryGetTweets( numTweetsToPing );
	console.log("Pinging for tweets...");

	setTimeout("pingTwitterForTweets()", numMsWait);
}

$(function() {

	var apiKey = '7gEJMMbhU_ez7QC_XSKBfOIMzIA';
	OAuth.initialize( apiKey );

	OAuth.popup('twitter', function(err, res) {
	    if (err) {
	        // TODO: do something with error
	    	alert(err.message);
	    }
	    else
	    {
	    	g_oauthResult = res;

	    	// grab user name/profile pix
		    g_oauthResult.get('/1.1/account/verify_credentials.json')
		       	.done( function(data) 
		       	{
		       		$('#profile').html('<img src="' + data.profile_image_url + '"> ' + data.screen_name);
		    	})


		    pingTwitterForTweets();
		    //queryGetTweets(10);
	    }
})

});