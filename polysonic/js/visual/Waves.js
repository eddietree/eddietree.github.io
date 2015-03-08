function Waves()
{
	BaseObj.call(this);
	this.time = 0.0;

	var numRings = 32;
	

	this.init = function()
	{
		this.mesh = new THREE.Line( this.getGeometry(), this.getShaderMaterial(), THREE.LinePieces );
		scene.add(this.mesh);
	};

	this.release = function()
	{
		scene.remove(this.mesh);
		this.mesh = null;
	};

	this.getGeometry = function()
	{
		// params
		var startRadius = 1.0;
		var ringMargin = 0.4;
		var numStepsPerRing = 32;
		var posY = -1.5;
		var centerX = 0.0;
		var centerY= posY;
		var centerZ = 0.0;

		var vertexPositions = [];
		var vertexColors = [];
		var vertexData = [];
		var indices_array = [];
		
		var deltaAngle = Math.PI * 2.0 / (numStepsPerRing-1);

		// vertex data
		for ( var iRing = 0; iRing < numRings; iRing++ )
		{
			var radius = startRadius + iRing * ringMargin;
			if ( iRing == 0 ) radius += ringMargin*0.25;

			for ( var iStep = 0; iStep < numStepsPerRing; iStep++ )
			{
				var angle = iStep * deltaAngle;

				var dirX = Math.cos(angle);
				var dirZ = Math.sin(angle);

				var posX = centerX + dirX * radius;
				var posY = centerY;
				var posZ = centerZ + dirZ * radius;

				vertexPositions.push( posX, posY, posZ );
				vertexColors.push(1,1,1,1.0);
				vertexData.push( dirX, dirZ, iRing, iRing / numRings );
			}
		}

		// middle ring
		for ( var iStep = 0; iStep < numStepsPerRing; iStep++ )
		{
			var radius = startRadius-ringMargin;

			var angle = iStep * deltaAngle;

			var dirX = Math.cos(angle);
			var dirZ = Math.sin(angle);

			var posX = centerX + dirX * radius;
			var posY = centerY;
			var posZ = centerZ + dirZ * radius;

			vertexPositions.push( posX, posY, posZ );
			vertexColors.push(1,1,1,1.0);
			vertexData.push( dirX, dirZ, iRing, iRing / numRings );
		}


		// indices
		for ( var iRing = 1; iRing < numRings-1; iRing++ )
		{
			var indexOffset = iRing * numStepsPerRing;

			for ( var iStep = 0; iStep < numStepsPerRing-1; iStep++ )
			{
				var index0 = indexOffset + iStep;
				var index1 = index0 + 1+ numStepsPerRing;
				indices_array.push(index0, index1);
			}
		}

		// indices 9 edge connectors
		for ( var iStep = 0; iStep < numStepsPerRing-1; iStep+=2 )
		{
			var index0 = iStep + numStepsPerRing;
			var index1 = index0+ 1;

			indices_array.push(index0, index1);
		}

		// center ring
		for ( var iStep = 0; iStep < numStepsPerRing-1; iStep++ )
		{
			var index0 = iStep;
			var index1 = index0+ 1;

			indices_array.push(index0, index1);
		}

		var geometry = new THREE.BufferGeometry();
		
		// vert attrib
		geometry.addAttribute( 'index', new THREE.BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertexPositions ), 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( vertexColors ), 4 ) );
		geometry.addAttribute( 'data', new THREE.BufferAttribute( new Float32Array( vertexData ), 4 ) );
		geometry.computeBoundingSphere();

		return geometry;
	};

	this.getShaderMaterial = function()
	{
		var ringUniformArray = new Array(numRings);
		for ( var i = 0; i < ringUniformArray.length; ++i ) {
			ringUniformArray[i] = 0.0;
		}

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 0.0},
			soundArray: {type: 'fv1', value: ringUniformArray},
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader : g_shaderFiles[ getShader('waves.vp') ],
			fragmentShader : g_shaderFiles[ getShader('waves.fp') ],

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	true,
			side: THREE.DoubleSide,
		});

		return shaderMaterial;
	};

	this.injectSoundVal = function( val )
	{
		this.mesh.material.uniforms.soundArray.value[0] = lerp( this.mesh.material.uniforms.soundArray.value[0], val, 0.7 );
	}

	this.update = function()
	{
		this.time += g_dt;

		this.mesh.rotation.y = this.time*0.2;

		var soundArray = this.mesh.material.uniforms.soundArray.value;
		var lerpFactor = 0.2;

		for ( var i = 1; i < soundArray.length; i++ )
		{
			soundArray[i] = lerp( soundArray[i], soundArray[i-1], lerpFactor );
		}

		soundArray[0] = lerp( soundArray[0], 0.0, 0.1 );

		//this.mesh.material.uniforms.soundArray.value[0] = Math.sin(this.time);
		//this.mesh.material.uniforms.soundArray.value[1] = Math.cos(this.time);
	};
}