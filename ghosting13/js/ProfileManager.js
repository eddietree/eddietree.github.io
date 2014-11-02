function ProfileManager()
{
	this.init = function()
	{
		this.currProfileIndex = -1;
		this.profiles = 
		[
			["lines"],
			["terrain"],
			["spikes"],
			["polybear"],
			["terrain"],
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
			divElem.css("display", "none");
		}

		// enable current profile1
		var currProfile = "profile_" + a_index;
		$("#"+currProfile).css("display", "block");
		console.log("Loading profile: " + currProfile );

		// deactivate all objects
		g_objs.deactivateAllObjs();

		// activate target profile
		var profile = this.profiles[a_index];
		for ( var i = 0; i < profile.length; i++ )
		{
			g_objs.activateObj(profile[i]);
		}

		this.currProfileIndex = a_index;
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

$("#tip").delay(4000).fadeOut();

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
	}
	else if ( keyCode == arrowLeftKeyCode )
	{
		g_profiles.loadPrevProfile();
	}
	else if ( keyCode >= numOffset && keyCode < numMax )
	{
		var index = keyCode - numOffset;
		g_profiles.loadProfile( index );
	}
};