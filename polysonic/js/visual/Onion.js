function Sphere( params )
{
	var vertexPositions = [];
	var vertexColors = [];
	var vertexData = [];
	var indices_array = [];
	var time = 0.0;
	var speed = 1.0;

	this.audioData = new THREE.Vector4(0.0,0.0,0.0,0.0);

	function getParamVal( keyName, defaultVal )
	{
		var value = params[keyName];
		if ( value ) return value;
		return defaultVal;
	}

	var numSlicesTheta = getParamVal("numSlicesTheta", 16);
	var numSlicesPhi = getParamVal("numSlicesPhi", 16);
	var radius = getParamVal("radius", 1);

	this.initIndicesArrayLines = function()
	{
		for ( var iPhi = 0; iPhi < numSlicesPhi-1; iPhi++ )
		{
			var indexOffset = iPhi * numSlicesTheta;

			for ( var iTheta = 0; iTheta < numSlicesTheta-1; iTheta++ ) 
			{
				var index0 = indexOffset + iTheta+1;
				var index1 = indexOffset + iTheta + numSlicesTheta;

				indices_array.push(index0, index1);
			}
		}
	};

	this.initIndicesArraySolid = function()
	{
		for ( var iPhi = 0; iPhi < numSlicesPhi-1; iPhi++ )
		{
			var indexOffset = iPhi * numSlicesTheta;

			for ( var iTheta = 0; iTheta < numSlicesTheta-1; iTheta++ ) 
			{
				var index0 = indexOffset + iTheta;
				var index1 = index0 + 1;
				var index2 = index0 + numSlicesTheta+1;
				var index3 = index0 + numSlicesTheta;

				indices_array.push( index0, index1, index2 );
				indices_array.push( index0, index2, index3 );
			}
		}
	};

	this.makeGeometry = function()
	{
		var deltaTheta = 2.0 * Math.PI / (numSlicesTheta-1);
		var deltaPhi = Math.PI / (numSlicesPhi-1);
		var startTheta = 0.0;
		var startPhi = - Math.PI*0.5;

		for ( var iPhi = 0; iPhi < numSlicesPhi; iPhi++ )
		{
			for ( var iTheta = 0; iTheta < numSlicesTheta; iTheta++ ) 
			{
				var theta = deltaTheta *-iTheta;
				var phi = deltaPhi *-iPhi;

				var x = radius * Math.cos( theta ) * Math.sin( phi );
				var y = radius * Math.sin( theta ) * Math.sin( phi );
				var z = radius * Math.cos( phi );

				vertexPositions.push( x, y, z );
				vertexColors.push(1,1,1,1.0);
				vertexData.push( theta, phi, Math.random(), Math.random() );
			}
		}

		var geometry = new THREE.BufferGeometry();
		
		// vert attrib
		geometry.addAttribute( 'index', new THREE.BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertexPositions ), 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( vertexColors ), 4 ) );
		geometry.addAttribute( 'data', new THREE.BufferAttribute( new Float32Array( vertexData ), 4 ) );
		geometry.computeBoundingSphere();

		this.geometry = geometry;
	}

	this.makeMesh = function()
	{
		if ( getParamVal("lines", false) ) {
			this.mesh = new THREE.Line( this.geometry, this.getShaderMaterial(), THREE.LinePieces );
		} else {
			this.mesh = new THREE.Mesh( this.geometry, this.getShaderMaterial() );
		}
	};

	this.getShaderMaterial = function()
	{
		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 0.0},
			audioData: {type: 'v4', value: new THREE.Vector4( 0.0, 0.0, 0.0, 0.0 ) },
			camPos: {type: 'v3', value: new THREE.Vector3( 0.0, 0.0 ,0.0 ) }
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader : g_shaderFiles[ getShader( getParamVal("vertexShader",'basic.vp')) ],
			fragmentShader : g_shaderFiles[ getShader( getParamVal("fragmentShader",'basic.fp')) ],
			//vertexShader:   document.getElementById( getParamVal("vertexShader",'vpBasic') ).textContent,
			//fragmentShader: document.getElementById( getParamVal("fragmentShader",'fpBasic') ).textContent,

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	true,
			side: getParamVal("side",THREE.FrontSide),
		});

		return shaderMaterial;
	};

	this.update = function()
	{
		time += g_dt * speed;
		this.mesh.material.uniforms.time.value = time;

		// cam pos
		this.mesh.material.uniforms.camPos.value.x = camera.position.x;
		this.mesh.material.uniforms.camPos.value.y = camera.position.y;
		this.mesh.material.uniforms.camPos.value.z = camera.position.z;
	};

	// make object!
	if ( getParamVal("lines", false) ) {
		this.initIndicesArrayLines();
	} else {
		this.initIndicesArraySolid();
	}

	this.makeGeometry();
	this.makeMesh();
}

function Onion()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.meshes = new Array();
		var radius = 1.0;
		this.time = 0.0;
		this.camRadius = 5.0;
		this.camRotateSpeed = 1.0;

		//var geometry = new THREE.BoxGeometry( cubeWidth, cubeWidth, cubeWidth );
		//var geometry = new THREE.SphereGeometry( radius, 16, 16 );
		//var phongMaterial =  new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0xffffff, shininess: 30, shading: THREE.FlatShading } )
		//var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

		this.makeSphere( {numSlicesTheta:64, numSlicesPhi:64, radius:2.0, vertexShader:'lines.vp', fragmentShader:'lines.fp', lines:true } );
		this.makeSphere( {numSlicesTheta:64, numSlicesPhi:64, radius:1, vertexShader:'fish.vp', fragmentShader:'fish.fp', side: THREE.DoubleSide, lines:false } );
		this.makeSphere( {numSlicesTheta:64, numSlicesPhi:64, radius:0.5, vertexShader:'core.vp', fragmentShader:'core.fp', side: THREE.FrontSide, lines:false } );

		renderer.setClearColor( 0x38AF62, 1);
	};

	this.makeSphere = function( params )
	{
		var sphere = new Sphere( params );
		this.meshes.push(sphere);
		scene.add( sphere.mesh );
	}

	this.release = function()
	{
		if ( this.meshes ) {
			for ( var i = 0; i < this.meshes.length; i++ ) {
				scene.remove( this.meshes[i].mesh );
			}
		}

		scene.fog = null;
		this.meshes = null;
	};

	this.update = function()
	{
		var cooldownTime = 2.0;
		var lerpTime = 2.0;

		this.time += g_dt * this.camRotateSpeed;

		for ( var i = 0; i < this.meshes.length; i++ )
		{
			var mesh = this.meshes[i];

			mesh.update();

			if ( i == 1 ) {
				mesh.mesh.rotation.x = Math.PI*0.25;
				mesh.mesh.rotation.y = this.time * 1.5;
			}

			if ( i==0 ) {
				//mesh.mesh.rotation.x = Math.PI*0.25;
				//mesh.mesh.rotation.y = -this.time * 0.2;
			}
		}

		this.updateCamera();
	};

	this.updateCamera = function()
	{
		var radius = this.camRadius;

		// radius modulated by pitch
		if ( g_audioManager ) radius -= g_audioManager.getUniformData().w*0.75;

		var circleTime = this.time* 0.13;
		camera.position.x = radius* Math.cos(circleTime);
		camera.position.z = radius* Math.sin(circleTime);
		camera.position.y = 0;

		camera.lookAt( camera.position.clone().negate() );
	};
}

//touchstart
var touchPressPos = {x:0.0, y:0.0};

window.addEventListener('touchstart', function(e) {

	var currTouchX = e.touches[0].clientX;
	var currTouchY = e.touches[0].clientY;
	touchPressPos.x = e.touches[0].clientX;
	touchPressPos.y = e.touches[0].clientY;

	console.log( "Touch Down", currTouchX , currTouchY);
 	//var onion = GetObj("onion");
}, false);

window.addEventListener('touchmove', function(e) {

	var currTouchX = e.touches[0].clientX;
	var currTouchY = e.touches[0].clientY;
	
	var diffX = currTouchX - touchPressPos.x;
	var diffY = currTouchY - touchPressPos.Y;

	touchPressPos.x = currTouchX;
	touchPressPos.y = currTouchY;

	//console.log(currTouchX , currTouchY);

	var onion = GetObj("onion");
 	onion.time += diffX * 0.03;
}, false);

