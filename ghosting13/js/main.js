// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

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

$(function() {

  	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xffffff, 1);
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	// objs
	g_objs = new ObjManager();
	g_objs.init();

	g_profiles = new ProfileManager();
	g_profiles.init();
	g_profiles.loadProfile(1);

	var stats = new Stats();
	stats.setMode(1); // 0: fps, 1: ms

	// align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.right = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );

	(function animloop(){
	  stats.begin();
	  render();
	  g_time += g_dt;
	  stats.end();

	  requestAnimFrame(animloop);
	})();
});

function render()
{
	renderer.render( scene, camera );

	g_objs.update();
	g_objs.draw();
}
