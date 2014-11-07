function Terrain()
{
	BaseObj.call(this);

	this.init = function()
	{
		var numCubesWidth = 11;
		var cubeWidth = 1.0;
		var cubeMargin = 0.5;
		var cubeRowWidth = numCubesWidth * (cubeWidth + cubeMargin );

		this.time = 0.0;
		this.cubes = new Array(numCubesWidth);
		this.cubeDistance = cubeWidth+cubeMargin;

		var count = 0;

		//var geometry = new THREE.BoxGeometry( cubeWidth, cubeWidth, cubeWidth );
		var geometry = new THREE.SphereGeometry( cubeWidth*0.5, 4, 4 );
		var phongMaterial =  new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0xffffff, shininess: 30, shading: THREE.FlatShading } )

		this.light = new THREE.PointLight( 0x403300, 2, 4 );
		scene.add(this.light);
		this.light.position.x = camera.position.x;
		this.light.position.y = camera.position.y;
		this.light.position.z = camera.position.z;

		for ( var x = 0; x < numCubesWidth; ++x )
		{
			for ( var y = 0; y < numCubesWidth; ++y )
			{
				for ( var z = 0; z < numCubesWidth; ++z )
				{
					var posX = -cubeRowWidth*0.5 + x * (cubeWidth + cubeMargin);
					var posY = -cubeRowWidth*0.5 + y * (cubeWidth + cubeMargin);
					var posZ = -cubeRowWidth*0.5 + z * (cubeWidth + cubeMargin);

					var cube = new THREE.Mesh( geometry, phongMaterial );

					cube.position.x = posX;
					cube.position.y = posY;
					cube.position.z = posZ;
					cube.rotation.y = this.time*100000.0;

					cube.index = {x:x, y:y, z:z};
					cube.positionBase = {x:posX, y:posY, z:posZ};

					this.light.add( cube );

					this.cubes[count] = cube;
					count++;
				}
			}
		}

		this.initParticles();

		scene.fog = new THREE.FogExp2( 0x38AF62, 0.25 );
		renderer.setClearColor( 0x38AF62, 1);
	};

	this.initParticles = function()
	{
		var numPoints = 1024;
		var numFloatsPerPos = 3;
		var numFloatsPerColor = 3;
		var posRadius = 4.0;

		var positions = new Float32Array( numPoints*numFloatsPerPos );
		var colors = new Float32Array( numPoints*numFloatsPerColor );

		for ( var i = 0; i < numPoints; i++ )
		{
			var posIndexOffset = i * numFloatsPerPos;
			var posColorOffset = i * numFloatsPerColor;

			var currPosRadius = posRadius;

			if ( Math.random() < 0.1 )
			{
				currPosRadius = 1.0;
			}

			var posX = (2.0*Math.random()-1.0) * currPosRadius;
			var posY = (2.0*Math.random()-1.0) * currPosRadius;
			var posZ = (2.0*Math.random()-1.0) * currPosRadius;

			positions[posIndexOffset+0] = posX;
			positions[posIndexOffset+1] = posY;
			positions[posIndexOffset+2] = posZ;

			colors[posColorOffset+0] = 0.75;
			colors[posColorOffset+1] = 0.75;
			colors[posColorOffset+2] = 0.75;
		}

		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, numFloatsPerPos ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, numFloatsPerColor ) );
		geometry.computeBoundingBox();

		var pointSize = 0.03;
		var material = new THREE.PointCloudMaterial( { size: pointSize, vertexColors: THREE.VertexColors } );
		
		this.pointcloud = new THREE.PointCloud( geometry, material );
		this.light.add(this.pointcloud);
	};

	this.release = function()
	{
		scene.fog = null;
		scene.remove(this.light);
		this.cubes = null;
	};

	this.update = function()
	{
		var cooldownTime = 0.0;
		var lerpTime = 2.5;

		this.time += g_dt;

		var time = this.time % (cooldownTime+lerpTime);
		var lerpFactor = clamp( (time-cooldownTime)/(lerpTime)  );

		lerpFactor = easeBounceInOut(lerpFactor);

		var count = Math.floor(this.time / (cooldownTime+lerpTime) );
		var coeffX = count % 3 == 0;
		var coeffY = count % 3 == 1;
		var coeffZ = count % 3 == 2;

		this.updateCubes(lerpFactor, coeffX, coeffY, coeffZ);

		var radius = 5.0;
		var circleTime = this.time* 0.3;
		camera.position.x = radius* Math.cos(circleTime);
		camera.position.z = radius* Math.sin(circleTime);
		camera.position.y = 0;

		camera.lookAt( camera.position.clone().negate() );

		// light
		this.light.position.x = 0;
		this.light.position.y = 0;
		this.light.position.z = 0;
	};

	this.updateCubes = function( lerpFactor, coeffX, coeffY, coeffZ )
	{
		var cubes = this.cubes;
		var numCubes = this.cubes.length;

		for (var i = 0; i < numCubes; i++ )
		{
			var cube = cubes[i];
			var index = cube.index;
			var posBase = cube.positionBase;
			var dist = this.cubeDistance * lerpFactor;

			var dirX = (index.x % 2)*2.0-1.0;
			var dirY = (index.y % 2)*2.0-1.0;
			var dirZ = (index.z % 2)*2.0-1.0;

			cube.rotation.y = Math.PI * lerpFactor * coeffX;
			cube.rotation.x = Math.PI * lerpFactor * coeffY;
			cube.rotation.z = Math.PI * lerpFactor * coeffZ;

			cube.position.x = posBase.x + dist*dirY * coeffX;
			cube.position.y = posBase.y + dist*dirZ * coeffY;
			cube.position.z = posBase.z + dist*dirX * coeffZ;
		}
	};
}