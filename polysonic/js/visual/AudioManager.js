function AudioManager()
{
	var pitchCurrent = 0.0;
	var pitchLerped = 0.0;
	var volumeCurrent = 0.0;
	var volumeLerped = 0.0;
	var lerpFactor = 0.2;

	var uniformData = new THREE.Vector4();

	this.init = function()
	{
		this.tryInitAudio();
		this.initGraph();

	  	if ( Settings.ShowWindow ) {
	    	$("#wrap").delay(100).fadeIn();
	  	}

	  	$("#btn-close").click(function() {  $("#wrap").fadeOut(); });
	};

	this.tryInitAudio = function() {
	  try {
	    initWebSocket();
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    navigator.getUserMedia = navigator.getUserMedia ||
	                             navigator.webkitGetUserMedia ||
	                             navigator.mozGetUserMedia;
	    window.URL = window.URL || window.webkitURL;  
	    audio_context = new AudioContext;
	  } catch (e) {
	    document.getElementById("error").innerHTML = "Error with Web Audio: " + e;
	  }
	  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
	    document.getElementById("error").innerHTML = "Error initializing getUserMedia: " + e;
	  });
	};

	this.initGraph = function()
	{
		var canvasId = "canvas-fft";
		$("#"+canvasId).show();

		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");

		var numPitchPoints = 128;
		this.pitchArray = new Array(numPitchPoints);
		this.pitchArrayIndex = 0;
		for ( var i = 0; i < this.pitchArray.length; i++ ) {
			this.pitchArray[i] = 0.0;
		}
	};

	this.updateGraph = function()
	{
		this.pitchArray[this.pitchArrayIndex] = pitchCurrent;
		this.pitchArrayIndex = (this.pitchArrayIndex+1) % this.pitchArray.length;
	};

	this.drawGraph = function()
	{
		var width = this.canvas.width;
		var height = this.canvas.height;
		
		var heightOffset = height * 0.1;
		var barHeight = height * 0.9;
		var numPts = this.pitchArray.length;
		var deltaX = width / (numPts-1);

		// clear screen
		this.ctx.clearRect(0, 0, width, height);

		// draw guide lines
		var numGuideLines = 4;
		this.ctx.beginPath();
		
		for ( var i = 0 ; i < numGuideLines; ++i )
		{
			var posY = height - (i * (barHeight/numGuideLines) ) - heightOffset;
			this.ctx.moveTo( 0, posY );
			this.ctx.lineTo( width, posY );
		}

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = '#888888';
		this.ctx.stroke();

		// start bar graph
		this.ctx.beginPath();
		this.ctx.moveTo( 0, height - heightOffset );

		var startIndex = (this.pitchArrayIndex+1) % this.pitchArray.length;
		for ( var i = startIndex; i < numPts; i++ )
		{
			var pitchVal = this.pitchArray[i];
			var posX = (i-startIndex)*deltaX;
			var posY = height - pitchVal * barHeight - heightOffset;

			this.ctx.lineTo( posX, posY );
		}

		for ( var i = 0; i < startIndex-1; i++ )
		{
			var pitchVal = this.pitchArray[i];
			var posX = (i+numPts-startIndex-1)*deltaX;
			var posY = height - pitchVal * barHeight - heightOffset;

			this.ctx.lineTo( posX, posY );
		}

		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#ffffff';
		this.ctx.stroke();

		// draw drawing circle
		this.ctx.beginPath();
		this.ctx.arc( width-deltaX*2.0, height - this.pitchArray[this.pitchArrayIndex-1]* barHeight - heightOffset, 8.0, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = '#FFC900';
		this.ctx.fill();
	};

	this.update = function()
	{
		this.updateGraph();
		this.drawGraph();

		volumeLerped = lerp( volumeLerped, volumeCurrent, lerpFactor );
		pitchLerped = lerp( pitchLerped, pitchCurrent, lerpFactor );

		// inject current pitch to waves
		var soundVal = (pitchLerped*2.0-1.0) * volumeLerped;
		GetObj("waves").injectSoundVal(soundVal*2.0);
		GetObj("onion").camRotateSpeed = lerp( GetObj("onion").camRotateSpeed, 1.0 + 5.0 * pitchLerped, 0.1 );

		// pass uniforms to onion
		var onion = GetObj("onion");
		for ( var i = 0; i < onion.meshes.length; i++ )
		{
			onion.meshes[i].mesh.material.uniforms.audioData.value.x = volumeCurrent;
			onion.meshes[i].mesh.material.uniforms.audioData.value.y = volumeLerped;
			onion.meshes[i].mesh.material.uniforms.audioData.value.z = pitchCurrent;
			onion.meshes[i].mesh.material.uniforms.audioData.value.w = pitchLerped;
		}
	};

	this.onGetDataVolume = function( volume )
	{
		var volumeScale = 60;
		volumeCurrent = saturate( volume / volumeScale );
	};

	this.onGetDataPitch = function( pitchArray )
	{
		var pitchScale = 200;
		var pitch = pitchArray[0];

		pitchCurrent = saturate( (pitch-100.0) / pitchScale );
	};

	this.getUniformData = function()
	{
		uniformData.x = volumeCurrent;
		uniformData.y = volumeLerped;
		uniformData.z = pitchCurrent;
		uniformData.w = pitchLerped;

		return uniformData;
	};
}

// toggle window
$("#btn-close-pitch").click(function() {  
	if ( $("#canvas-fft").is(":visible") ) {
		$("#canvas-fft").hide(); 
	} else { 
		$("#canvas-fft").show(); 
	}
});