function ProfileManager()
{
	this.init = function()
	{
		this.currProfileIndex = -1;
		this.profiles = 
		[
			["lines"],
			["spikes"],
			["terrain"],
			["polybear"],
			["mask"],
			["cubes"],
			["superformula"],
		];
	};

	this.loadProfile = function( a_index )
	{
		var numProfiles = this.profiles.length;

		// ignore bad profiles
		if ( a_index < 0 || a_index >= numProfiles) {
			return;
		}

		// hide all other profile texts
		for( var i = 0; i < numProfiles; i++ )
		{
			var currProfileName = "profile_" + i;
			var divElem = $("#"+currProfileName);
			divElem.stop();
			divElem.hide();
		}

		// enable current profile1
		var currProfile = "profile_" + a_index;
		console.log("Loading profile: " + currProfile );

		// deactivate all objects
		g_objs.deactivateAllObjs();

		// activate target profile
		var profile = this.profiles[a_index];
		for ( var i = 0; i < profile.length; i++ )
		{
			console.log("loading item: " + profile[i] );
			g_objs.activateObj(profile[i]);
		}

		this.currProfileIndex = a_index;

		// profile text
		if ( Settings.ShowProfileText ) {
			var currProfileElem = $("#"+currProfile);
			currProfileElem.fadeIn();

			$("#lags").fadeIn();

			// stop all animations
			$(".annecdote").dequeue();
			$(".annecdote").stop(true,true);
			$(".annecdote").hide();

			var annecdoteFirst = $("#"+currProfile + " > div.annecdotes:first > div.annecdote:first");
			var thisObj = this;

			function fadeSeq( a_annecdote )
			{
				var currentProfileTest = "profile_"+thisObj.currProfileIndex;
				if ( currProfile != currentProfileTest) 
					return;

				 var seq = a_annecdote.fadeIn().delay(Settings.AnnecdoteWaitTime).fadeOut(null, function() 
					{ 
						var nextObj = a_annecdote.next();
						if ( nextObj.length == 0 )
						{
							nextObj = a_annecdote.siblings().first();
						}
						//console.log(nextObj);
						fadeSeq(nextObj);
					});
			}

			fadeSeq(annecdoteFirst);
		}

		// reset camera
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 5;
		camera.lookAt( new THREE.Vector3( 0, 0, -1 ) );
	};

	this.loadNextProfile = function()
	{
		var numProfiles = this.profiles.length;
		var nextProfileIndex = (this.currProfileIndex+1) % numProfiles; 
		this.loadProfile(nextProfileIndex);
	};

	this.loadPrevProfile = function()
	{
		var numProfiles = this.profiles.length;
		var prevProfileIndex = (this.currProfileIndex-1) % numProfiles; 

		if ( prevProfileIndex < 0 )
		{
			prevProfileIndex = numProfiles-1;
		}
		this.loadProfile(prevProfileIndex);
	};
}

window.addEventListener('touchstart', function() {
	g_profiles.loadNextProfile();
}, false);

window.onkeyup = function( event ) {
	var spaceKeyCode = 32;
	var arrowRightKeyCode = 39;
	var arrowLeftKeyCode = 37;
	var keyCode = event.keyCode;

	var numOffset = 49;
	var numMax = numOffset + 9;

	if ( keyCode == spaceKeyCode || keyCode == arrowRightKeyCode )
	{
		g_profiles.loadNextProfile();
		$("#tip").dequeue().stop().fadeOut();
	}
	else if ( keyCode == arrowLeftKeyCode )
	{
		g_profiles.loadPrevProfile();
		$("#tip").dequeue().stop().fadeOut();
	}
	else if ( keyCode >= numOffset && keyCode < numMax )
	{
		var index = keyCode - numOffset;
		g_profiles.loadProfile( index );
	}
};