function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var scene;
var camera;
var renderer;
var g_objs;
var g_profiles;
var g_dt = 1.0 / 60.0;
var g_time = 0.0;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

$(function() {

	var cmdVisual = getQueryVariable("visual");
	var cmdShowText = getQueryVariable("text");
	var cmdAutoplay = getQueryVariable("autoplay");
	
	if ( cmdShowText ) Settings.ShowProfileText = cmdShowText != 0;
	if ( cmdAutoplay ) Settings.Autoplay = cmdAutoplay != 0;

	if ( Settings.ShowProfileText ) {
		$("#tip").delay(1000).fadeIn().delay(4000).fadeOut();
	}
	if ( cmdVisual ) {
		Settings.StartProfileIndex = cmdVisual;
	}

  	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 5;

	console.log(camera.position.x,camera.position.y,camera.position.z);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xffffff, 1);
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	// objs
	g_objs = new ObjManager();
	g_objs.init();

	// profile
	g_profiles = new ProfileManager();
	g_profiles.init();
	g_profiles.loadProfile( Settings.StartProfileIndex );

	if ( Settings.Autoplay ) {
		console.log("autplaying..");

		var DoAutoPlay = function()
		{
			var timeoutTime = Settings.AutoplayTimeout;
			setTimeout(function() { g_profiles.loadNextProfile();  DoAutoPlay(); },timeoutTime)
		}
		DoAutoPlay();
	}

	// show stats
	if ( Settings.ShowFPS ) {
		var stats = new Stats();
		stats.setMode(1); // 0: fps, 1: ms

		// align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.right = '0px';
		stats.domElement.style.top = '0px';
		document.body.appendChild( stats.domElement );
	}

	(function animloop(){

	  if ( stats ) stats.begin();

	  render();
	  g_time += g_dt;

	  if ( stats ) stats.end();

	  requestAnimationFrame(animloop);
	})();
});

function render()
{
	renderer.render( scene, camera );

	g_objs.update();
	g_objs.draw();
}
