function resize()
{
	if ( g_canvas.width != window.innerWidth || g_canvas.height != window.innerHeight)
	{
    	g_canvas.width = window.innerWidth;
    	g_canvas.height = window.innerHeight;
    }
}

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

function ObjManager()
{
	this.init = function()
	{
		this.objs = 
		{
			/*shapes:new ShapeEmitter(),
			shadow:new MascotShadow(),
			body:new MascotBody(),
			head:new MascotHead(),*/
		};

		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];
		        obj.init();
		    }
		}
	}

	this.update = function()
	{
		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];
		        obj.update();
		    }
		}
	}

	this.get = function( a_name )
	{
		return this.objs[a_name];
	}
}

function animate(time) {
    requestAnimFrame( animate );
    TWEEN.update( time );
    resize();

    //g_time += 1.0/60.0;
    g_objs.update();

    ctx.clearRect(0, 0, g_canvas.width, g_canvas.height);

    //ctx.fillStyle = "red";
    //ctx.fillRect(0, 0, g_canvas.width/2, g_canvas.height/2);

    if (ctrack.getCurrentPosition()) {
		ctrack.draw(g_canvas);
	}
}

var g_objs = new ObjManager();
var vid = document.getElementById('videoel');
var g_canvas = document.getElementById('overlay');
var ctx = g_canvas.getContext('2d');
var ctrack;

window.onload = function() {
	g_objs.init();
	
	ctrack = new clm.tracker({useWebGL : true});
	ctrack.init(pModel);
	
	function enablestart() {
		//vid.play();
		ctrack.start(vid);
		requestAnimFrame( animate );
	}
	
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

	// check for camerasupport
	if (navigator.getUserMedia) {
		// set up stream
		
		var videoSelector = {video : true};
		if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
			var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
			if (chromeVersion < 20) {
				videoSelector = "video";
			}
		};
	
		navigator.getUserMedia(videoSelector, function( stream ) {
			if (vid.mozCaptureStream) {
				vid.mozSrcObject = stream;
			} else {
				vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
			}
			vid.play();
		}, function() {
			document.getElementById('gum').className = "hide";
			document.getElementById('nogum').className = "nohide";
			alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
		});
	} else {
		document.getElementById('gum').className = "hide";
		document.getElementById('nogum').className = "nohide";
		alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
	}

	vid.addEventListener('canplay', enablestart, false);
};



/////////////////////////////////////////
/*
var GuiControls = function() {
  this.message = 'dat.gui';
  this.speed = 0.8;
  this.displayOutline = false;

  this.toggleMute = function() 
  { 
  	var volume = osc.volume;
  	var volume_on_volume = -10;
  	var volume_off_volume = -10000;
  	osc.setVolume(volume_off_volume);
  };
};

window.onload = function() {
	var text = new GuiControls();
	var gui = new dat.GUI();
	gui.add(text, 'message');
	//gui.add(text, 'speed', -5, 5);
	//gui.add(text, 'displayOutline');
	gui.add(text, 'toggleMute');
};
*/