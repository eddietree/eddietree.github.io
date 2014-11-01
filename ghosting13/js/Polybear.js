function Polybear()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.time = 0.0;
		renderer.setClearColor( 0x0fffff, 1);

		var geometry = new THREE.BufferGeometry();
		var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

		var positions = [];
		var colors = [];
		var indices_array = [];

		var numPtsX = 96;
		var numPtsY = 96;
		var numVerts = numPtsX * numPtsY;
		var deltaStep = 0.15;

		// generate verts
		var posXOffset = -numPtsX * deltaStep * 0.5;
		var posYOffset = -numPtsY * deltaStep * 0.5;

		for ( var y = 0; y < numPtsY; y++ )
		{
			for ( var x = 0; x < numPtsX; x++ )
			{
				var posX = posXOffset + x * deltaStep;
				var posY = posYOffset + y * deltaStep;
				var posZ = 0.0;

				positions.push(posX, posY,posZ);
				colors.push(1,1,1,0.5);
				//colors.push(0.5,0.5,0.5);
			}
		}

		// generate indices
		for ( var y = 0; y < numPtsY-1; y++ )
		{
			var rowIndexOffset = y * numPtsX;

			for ( var x = 0; x < numPtsX-1; x++ )
			{
				var indexCurr = rowIndexOffset + x;	
				var indexRight = indexCurr + 1;	
				var indexTop = indexCurr + numPtsX;	
				var indexTopRight = indexTop + 1;	

				indices_array.push(indexCurr, indexTopRight);	
				//indices_array.push(indexCurr, indexTop);	
			}
		}

		// top row - needs to stitch together
		for ( var x = 0; x < numPtsX-1; x++ )
		{
			var index0 = (numPtsY-1)*numPtsX + x;
			var index1 = index0 + 1;
			indices_array.push(index0, index1);
		}

		// right col - needs to stitch together
		for ( var y = 0; y < numPtsY-1; y++ )
		{
			var index0 = y*numPtsX + numPtsX-1;
			var index1 = index0 + numPtsX;
			indices_array.push(index0, index1);
		}

		// vert attrib
		geometry.addAttribute( 'index', new THREE.BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( positions ), 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 4 ) );
		geometry.computeBoundingSphere();

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			//data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 2.0}
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderPolybear' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderLines' ).textContent,

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	true,
		});

		this.mesh = new THREE.Line( geometry, shaderMaterial, THREE.LinePieces );
		//this.mesh = new THREE.Mesh( geometry, shaderMaterial );
		scene.add( this.mesh );
	};

	this.release = function()
	{
		scene.remove(this.mesh);
		this.mesh = null;
	};

	this.update = function()
	{
		this.time += g_dt;
		this.mesh.material.uniforms.time.value = this.time;
		this.mesh.material.needsUpdate = true;
	};
}