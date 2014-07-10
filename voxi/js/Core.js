
var g_heroPos = new THREE.Vector3(0.0,0.0,0.0);
var mousePos = {x:0,y:0};
var mousePosPrev = {x:0,y:0};
var mousePosDelta = {x:0,y:0};
var mouseDown = 0;

function Core()
{
	this.init = function()
	{
		var clearColor = 0xAAAAAA;

 		// renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor( clearColor, 1 );
		document.body.appendChild(this.renderer.domElement);

		// scene
		g_scene = new THREE.Scene();
		//g_scene.fog = new THREE.FogExp2( clearColor, 0.07 );

		var light1 = new THREE.PointLight( 0xffffff, 2, 5 );
		light1.position.z = 3.0;
		g_scene.add( light1 );

		g_scene.add( new THREE.AmbientLight(  0x202020 ) );

		// camera
 		g_camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 500);
 		g_camera.lookAt( new THREE.Vector3(0.0,0.0,0.0) );

 		this.initItems();	
	}

	this.initItems = function()
	{
		this.objects = new Array();

 		//this.objects.push( new DebugGrid() );
 		this.objects.push( new Face() );
 		this.objects.push( new Grass() );
 		this.objects.push( new Particles() );
 		//this.objects.push( new Floor() );

 		for( var i=0; i < this.objects.length; i++ )
 		{
 			this.objects[i].init();
 		}

 		this.cameraProps = 
 		{
 			phi: 0.5 * Math.PI,
 			theta: 0.15 * Math.PI,
 			radius: 50.0,
 		};
	}

	this.draw = function()
	{
		requestAnimationFrame(doTick);

		for( var i=0; i < this.objects.length; i++ )
 		{
 			var obj = this.objects[i];

 			if ( obj.hasOwnProperty('draw') )
	 			obj.draw();
 		}

	    g_core.renderer.render(g_scene, g_camera);
	}

	this.spinCamera = function()
	{
		var radius = this.cameraProps.radius;
		var theta = this.cameraProps.theta;
		var phi = this.cameraProps.phi;

		var x = radius * Math.sin(theta) * Math.sin(phi);
		var y = radius * Math.cos(phi);
		var z = radius * Math.cos(theta) * Math.sin(phi);

		g_camera.position.x = x;
		g_camera.position.y = y;
		g_camera.position.z = z;

		g_camera.lookAt( new THREE.Vector3(0.0,1.0,0.0) );
	}

	this.update = function()
	{
		this.spinCamera();

		for( var i=0; i < this.objects.length; i++ )
 		{
 			var obj = this.objects[i];

 			if ( obj.hasOwnProperty('update') )
	 			obj.update();
 		}
	}
}

function getObj( a_id )
{
	for( var i=0; i < g_core.objects.length; i++ )
	{
		var obj = g_core.objects[i];
		if ( obj.hasOwnProperty('id') && obj.id == a_id )
		{
			return obj;
		}

		return null;
	}
}

var g_scene;
var g_camera;
var g_core = new Core();
g_core.init();


// handle resizing windows
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    g_camera.aspect = window.innerWidth / window.innerHeight;
    g_camera.updateProjectionMatrix();

    g_core.renderer.setSize( window.innerWidth, window.innerHeight );
}

var doTick = function() 
{
	g_core.update();
	g_core.draw();
};

doTick();


document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

document.body.onmousemove=function(event)
{
	mousePosDelta.x = event.clientX - mousePos.x;
    mousePosDelta.y = event.clientY - mousePos.y;
	mousePosPrev.x = mousePos.x;
    mousePosPrev.y = mousePos.y;
	mousePos.x = event.clientX;
    mousePos.y = event.clientY;

	if ( mouseDown )
	{
		var coeff = 0.01; 
		g_core.cameraProps.theta = wrap( g_core.cameraProps.theta - mousePosDelta.x*coeff, 0.0, 2.0*Math.PI);
		g_core.cameraProps.phi = clamp( g_core.cameraProps.phi - mousePosDelta.y*coeff, 0.01, Math.PI*0.5-0.01);
	}
};

document.body.onmousewheel = function(event) {
	var deltaY = event.deltaY;

	g_core.cameraProps.radius = clamp( g_core.cameraProps.radius + deltaY * 0.05, 10.0, 200.0 );
}
