function Mask()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.time = 0.0;

		renderer.setClearColor( 0x777777, 1);

		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {

			console.log( item, loaded, total );
		};

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) {
		};

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			normal: { type: 'f', value: null },
			//data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 2.0}
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderMaskNight' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderMaskNight' ).textContent,

			blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	true,
		});

		// model
		var loader = new THREE.OBJLoader( manager );
		var thisObj = this;
		loader.load( 'obj/fembotface.obj', function ( object ) {

			object.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {
					child.material = shaderMaterial;
					//child.material.map = texture;
				}
			} );

			thisObj.obj = object;
			object.position.y = - 1;
			scene.add( object );

		}, onProgress, onError );

		this.initParticles();
	};

	this.release = function()
	{
		if ( this.obj ) scene.remove(this.obj);
		if ( this.pointcloud ) scene.remove(this.pointcloud);
		
		this.obj = null;
		this.pointcloud = null;
	};

	this.rotateCamera = function()
	{
		var radius = 9.0;
		var time = this.time * 0.5;
		//time = Math.PI * 2.0;

		camera.position.x = radius * Math.cos(time*0.5);
		camera.position.y = radius * Math.sin(time)*0.2;
		camera.position.z = radius;

		camera.lookAt( camera.position.clone().negate() );
	};

	this.initParticles = function()
	{
		var numPoints = 512;
		var numFloatsPerPos = 3;
		var numFloatsPerColor = 3;
		var posRadius = 10.0;

		var positions = new Float32Array( numPoints*numFloatsPerPos );
		var colors = new Float32Array( numPoints*numFloatsPerColor );

		for ( var i = 0; i < numPoints; i++ )
		{
			var posIndexOffset = i * numFloatsPerPos;
			var posColorOffset = i * numFloatsPerColor;

			var currPosRadius = posRadius;

			if ( Math.random() < 0.5 )
			{
				currPosRadius = 5.0;
			}

			var posX = (2.0*Math.random()-1.0) * currPosRadius;
			var posY = (2.0*Math.random()-1.0) * currPosRadius;
			var posZ = (2.0*Math.random()-1.0) * currPosRadius;

			positions[posIndexOffset+0] = posX;
			positions[posIndexOffset+1] = posY;
			positions[posIndexOffset+2] = posZ;

			colors[posColorOffset+0] = 1.0;
			colors[posColorOffset+1] = 1.0;
			colors[posColorOffset+2] = 1.0;
		}

		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, numFloatsPerPos ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, numFloatsPerColor ) );
		geometry.computeBoundingBox();

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
		};

		uniforms = {
			time: {type: 'f', value: 2.0},
			camPos: {type: 'v3', value: new THREE.Vector3( 0, 1, 2 ) }
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderParticles' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderParticles' ).textContent,

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		false,
			transparent:	true,
			size: 10
		});

		var pointSize = 0.03;
		var material = new THREE.PointCloudMaterial( { size: pointSize, vertexColors: THREE.VertexColors } );
		
		this.pointcloud = new THREE.PointCloud( geometry, shaderMaterial );
		scene.add(this.pointcloud);
	};

	this.update = function()
	{
		var thisObj = this;
		if ( this.obj )
		{
			this.obj.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {
					child.material.uniforms.time.value = thisObj.time;
					//child.material.uniforms.time.value = 4.0;
					//child.material.map = texture;
				}
			} );
		}

		this.pointcloud.material.uniforms.time.value = this.time;
		//console.log(this.pointcloud.material.uniforms);
		this.pointcloud.material.uniforms.camPos.value = camera.position;

		this.time += g_dt;
		this.rotateCamera();
		//camera.position.z = 9;
	};
}