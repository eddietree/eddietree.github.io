$(function() {
	//alert("HELLO");

	OAuth.initialize('7gEJMMbhU_ez7QC_XSKBfOIMzIA');

	OAuth.popup('twitter', function(error, result) {
		alert(error.message);
	  //handle error with error
	  //use result.access_token in your API request
	});

});