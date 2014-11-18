function SoundCloudManager()
{
	var analyser;
	var freqByteData;

	this.channels = {
		bass: { val:0.0, index: 0, threshold: 0.95, scale: 10.0 },
		snare: { val:0.0, index: 320, threshold: 0.3, scale: 3.0 },
		chords: { val:0.0, index: 54, threshold: 0.5, scale: 3.0 },
	};

	this.clearColor0 = new THREE.Color( 0x38AF62 );
	this.clearColor1 = new THREE.Color( 0xffff00 );
	this.clearColor = new THREE.Color();

	this.init = function()
    {
    	var clientId = "f0e7d787e5b20cddd319cf439a5d1cb3";
    	var trackId = "175342694";

        var webAudioAPI = window.AudioContext || window.webkitAudioContext;
        var ctx = new webAudioAPI(),
            audio = new Audio(),
            invocation = new XMLHttpRequest(),
            source,
            url = 'http://api.soundcloud.com/tracks/' + trackId + '/stream' +
                  '?client_id=' + clientId
            ;

        audio.controls = false;
        analyser = ctx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = .85;

        /*https://developers.soundcloud.com/blog/of-cors-we-do*/
        /*http://stackoverflow.com/questions/25476137/mp3-issue-with-html5-audio-in-firefox*/
        fetchAudioAsset(url, ctx, function( buffer ) {
          audioSource = [];
          audioSource[0] = ctx.createBufferSource();
          audioSource[0].buffer = buffer;
          audioSource[0].connect(ctx.destination);
          audioSource[0].connect(analyser);
          audioSource[0].start();
        });

        function fetchAudioAsset (path, audioCtx, callback) {
          invocation.open('GET', path, true);
          invocation.responseType = 'arraybuffer';
          invocation.onload = function() {
            if (invocation.readyState != 4) return;
            audioCtx.decodeAudioData(invocation.response, function(buffer) {
              callback && callback(buffer);
            });
          }.bind(this);
          invocation.onprogress = function(ev) {
            console.log('burrefing audio', (((ev.loaded / ev.total) * 100) + '%') );
          };

          fetchAudioAsset.request && fetchAudioAsset.request.abort();
          fetchAudioAsset.request = invocation;
          invocation.send();
        };

        freqByteData = new Uint8Array(analyser.frequencyBinCount);

        var canvasId = "canvas-fft";

        if ( Settings.ShowGraph ) {
            $("#"+canvasId).show();
        }

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        console.log("Number of freq bins: " + analyser.frequencyBinCount);

        $("#soundcloud").delay(600).fadeIn();
    };

	this.setMeshUniform = function( meshIndex, channel )
	{
		var channelVal = this.getChannelVal(channel);
		var onion = GetObj("onion");

		onion.meshes[meshIndex].mesh.material.uniforms.audioData.value.w = channelVal;
	}

	this.update = function()
	{
		analyser.getByteFrequencyData( freqByteData );
		this.updateChannels();

		this.setMeshUniform( 0, "snare" );
		this.setMeshUniform( 2, "chords" );
		//this.setMeshUniform( 1, "bass" );

		GetObj("waves").injectSoundVal( -this.getChannelVal("bass")*2.0 );
		GetObj("onion").camRadius = lerp( GetObj("onion").camRadius, 5.0 - 0.5 * this.getChannelVal("bass"), 0.2 );
		GetObj("onion").camRotateSpeed = lerp( GetObj("onion").camRotateSpeed, 1.0 + 15.0 * (this.getChannelVal("snare")+this.getChannelVal("bass")*0.1 ), 0.1 );

		var clearSoundVal = this.getChannelVal("snare")*0.15;
		renderer.setClearColor( this.clearColor0.clone().lerp( this.clearColor1, clearSoundVal ), 1); 
	};

	this.getChannelVal = function( channel ) 
	{
		return this.channels[channel].val;
	};

	this.updateChannels = function()
	{
		for (var k in this.channels ) {
		    if (this.channels.hasOwnProperty(k)) {

		    	var channelData = this.channels[k];
		    	var fftData = freqByteData[channelData.index] / 255.0;
		    	channelData.val = saturate((fftData - channelData.threshold) * channelData.scale );
		     }
		 }
	}

	this.draw = function()
	{
		if ( !Settings.ShowGraph ) return;

		var width = this.canvas.width;
		var height = this.canvas.height;

		this.ctx.clearRect(0, 0, width, height);

		// guide lines
		var numGuideLines = 4;
		this.ctx.beginPath();
		for ( var i = 0; i < numGuideLines; i++ )
		{
			var posY = height - ( height / numGuideLines) * i;
			this.ctx.moveTo( 0, posY );
			this.ctx.lineTo( width, posY );
		}
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = '#FFFFFF';
		this.ctx.stroke();

		var numBins = analyser.frequencyBinCount;
		var deltaWidth = width/numBins;
		var divisor = 1.0 / 255.0;

		this.ctx.fillStyle = "#FFC900";

		for( var i  = 0; i < numBins; i++ )
		{
			var fftVal = freqByteData[i] * divisor;
			var barWidth = deltaWidth;
			var barHeight = fftVal * height;

			var posX = i * deltaWidth;
			var posY = height-barHeight;

			if ( barHeight > 1 ) {
				
				/*if ( i == this.channels.chords.index ) {
					this.ctx.fillStyle = "green";
					this.ctx.fillRect(posX, posY, barWidth-1, barHeight);
				}*/

				this.ctx.fillRect(posX, posY, barWidth-1, barHeight);
			}
		}

		//console.log(numBins);
	};
}