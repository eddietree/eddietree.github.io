
var g_heroPos = new THREE.Vector3(0.0,0.0,0.0);

function Core()
{
	this.init = function()
	{
		var clearColor = 0xC7EEEC;

 		// renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor( clearColor, 1 );
		document.body.appendChild(this.renderer.domElement);

		// scene
		g_scene = new THREE.Scene();
		g_scene.fog = new THREE.FogExp2( clearColor, 0.07 );

		// camera
 		g_camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 20);
 		g_camera.lookAt( new THREE.Vector3(0.0,0.0,0.0) );

 		this.initItems();	
	}

	this.initItems = function()
	{
		this.objects = new Array();

 		//this.objects.push( new DebugGrid() );
 		this.objects.push( new Floor() );
 		this.objects.push( new Mountain() );
 		this.objects.push( new Forest() );
 		this.objects.push( new Hero() );
 		this.objects.push( new Particles() );
 		this.objects.push( new LightRay() );

 		for( var i=0; i < this.objects.length; i++ )
 		{
 			this.objects[i].init();
 		}
	}

	this.draw = function()
	{
		requestAnimationFrame(doTick);

		for( var i=0; i < this.objects.length; i++ )
 		{
 			var obj = this.objects[i];

 			if ( obj.hasOwnProperty('update') )
	 			obj.draw();
 		}

	    g_core.renderer.render(g_scene, g_camera);
	}

	this.spinCamera = function()
	{
		var time = Date.now() * 0.0003;
		var radius = 7.0;
		g_camera.position.x = radius * Math.cos(time);
		g_camera.position.z = radius * Math.sin(time);
		g_camera.position.y = radius * 0.4;

		g_camera.lookAt( new THREE.Vector3(0.0,0.0,0.0) );
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

