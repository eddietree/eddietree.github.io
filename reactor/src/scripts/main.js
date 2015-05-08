var THREEx	= THREEx 		|| {};
THREEx.WindowResize	= function(renderer, camera){

	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}

	// bind the resize event
	window.addEventListener('resize', callback, false);
	return {
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}



var g_scene = new THREE.Scene();
var g_camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var g_renderer = new THREE.WebGLRenderer();

g_renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( g_renderer.domElement );

var App = function (firstName) {
  //this.firstName = firstName;
  console.log('Person instantiated');

  this.init = function()
  {

	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ffaf } );
	var cube = new THREE.Mesh( geometry, material );
	g_scene.add( cube );

	g_camera.position.z = 5;
	g_camera.position.x = 2;
  };
  this.update = function()
  {
  		//cube.rotation.x += 0.1;
		//cube.rotation.y += 0.1;
  };

  this.draw = function()
  {

  };

};

var app = new App();
app.init();

var render = function () {
	requestAnimationFrame( render );

	app.update();
	g_renderer.render(g_scene, g_camera);
};

render();
THREEx.WindowResize(g_renderer, g_camera);