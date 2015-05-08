var App = function (firstName) {
  //this.firstName = firstName;

  console.log('Person instantiated');

  this.init = function()
  {
  	// init scene/renderer
	g_scene = new THREE.Scene();
	g_camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	g_renderer = new THREE.WebGLRenderer();
	g_renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( g_renderer.domElement );

	this.initObjs();

	g_camera.position.z = 5;
	g_camera.position.x = 2;
  };

  this.initObjs = function()
  {
	// cube
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ffaf } );
	var cube = new THREE.Mesh( geometry, material );
	g_scene.add( cube );
  };

  this.start = function()
  {
  	THREEx.WindowResize(g_renderer, g_camera);

  		var render = function () {
			requestAnimationFrame( render );
			g_app.update();
			g_app.draw();
		};

		render();
  };

  this.update = function()
  {
  		//cube.rotation.x += 0.1;
		//cube.rotation.y += 0.1;
  };

  this.draw = function()
  {
  	g_renderer.render(g_scene, g_camera);
  };
};