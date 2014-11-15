function Particles()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.initParticles();
	};

	this.initParticles = function()
	{
		var numPoints = 2048;
		var numFloatsPerPos = 3;
		var numFloatsPerColor = 3;
		var posRadius = 3.0;

		var positions = new Float32Array( numPoints*numFloatsPerPos );
		var colors = new Float32Array( numPoints*numFloatsPerColor );

		for ( var i = 0; i < numPoints; i++ )
		{
			var posIndexOffset = i * numFloatsPerPos;
			var posColorOffset = i * numFloatsPerColor;

			var currPosRadius = posRadius;

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
			distToEyePlane: {type: 'f', value: 2.0},
			camPos: {type: 'v3', value: new THREE.Vector3( 0, 1, 2 ) }
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   getShader( "particles.vp" ),
			fragmentShader: getShader( "particles.fp" ),

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	false,
			size: 10
		});

		scene.fog = new THREE.FogExp2( 0x38AF62, 0.2 );

		var pointSize = 0.03;
		var material = new THREE.PointCloudMaterial( { size: pointSize, fog: true, vertexColors: THREE.VertexColors } );

		//this.pointcloud = new THREE.PointCloud( geometry, shaderMaterial );
		this.pointcloud = new THREE.PointCloud( geometry, material );
		scene.add(this.pointcloud);
	};

	this.release = function()
	{
		scene.remove(this.pointcloud);
		this.pointcloud = null;
	};

	this.update = function()
	{
		this.time += g_dt;

		var screenWidth = 0.5;//window.innerWidth;
		var fovAngle = camera.fov * Math.PI / 180.0;
		var distToEyePlane = screenWidth*0.5 / Math.tan( fovAngle*0.5 );

		if ( this.pointcloud.material.uniforms )
		{
			this.pointcloud.material.uniforms.time.value = this.time;
			this.pointcloud.material.uniforms.distToEyePlane.value = distToEyePlane;
			this.pointcloud.material.uniforms.camPos.value = camera.position;
		}
	};
}