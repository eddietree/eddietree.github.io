function Grass()
{
	this.id = 'grass';

	this.initTerrain = function()
	{
		var numBlades = 4000;
		var numSegmentsPerBlade = 4;
		var maxDist = 35.0;
		var yMin = -10.0;
		var yMax = -3.0;
		var bladeWidth = 0.6;

		//var numVertsPerBlade = ((numSegmentsPerBlade-1)*2 + 4);
		var numVertsPerSegment = 6;
		var numVertsPerBlade = numSegmentsPerBlade * numVertsPerSegment;
		var numVertsTotal = numVertsPerBlade * numBlades;

		/// generate geometry
		var geo = new THREE.BufferGeometry();

		geo.addAttribute( 'position', Float32Array, numVertsTotal, 3 );
		geo.addAttribute( 'color', Float32Array, numVertsTotal, 3 );
		geo.addAttribute( 'data', Float32Array, numVertsTotal, 3 );

		var positions = geo.attributes.position.array;
		var colors = geo.attributes.color.array;
		var data = geo.attributes.data.array;

		for ( var i = 0; i < numBlades; i ++ ) 
		{
			var yHeight = (yMax-yMin) * randFloat(0.8,1.0);
			var yDiff = new THREE.Vector3(0.0, yHeight, 0.0);

			var bladeVertIndexOffset = i * numVertsPerBlade;

			var rootPos = new THREE.Vector3( randFloat(-maxDist, maxDist), yMin, randFloat(-maxDist, maxDist) );
			
			var bladeAngle = randFloat(0.0, Math.PI*2.0);
			var bladeDirNormalized = new THREE.Vector3( Math.cos(bladeAngle), 0.0, Math.sin(bladeAngle) ); 
			var bladeDir = bladeDirNormalized.clone().multiplyScalar(-bladeWidth*0.5);

			var rootPosLeft = rootPos.clone().add(bladeDir); 
			var rootPosRight = rootPos.clone().sub(bladeDir); 
			var topPosLeft = rootPosLeft.clone().add(yDiff);
			var topPosRight = rootPosRight.clone().add(yDiff);

			var deltaY = yHeight / (numSegmentsPerBlade+1);
			var deltaPos = new THREE.Vector3( 0.0, deltaY, 0.0 );

			var bladeDataRandom0 = randFloat(0.0,1.0);
			var bladeDataRandom1 = randFloat(0.0,1.0);

			for ( var j = 0; j < numSegmentsPerBlade; j++ )
			{
				// color
				var delta = 1.0 / numSegmentsPerBlade;
				var r = 0.3;
				var g = delta*j;
				var b = 0.3;

				var numFloatsPerVertex = 3;
				var numFloatsPerSegment = numVertsPerSegment * numFloatsPerVertex;
				var segmentVertIndexOffset = bladeVertIndexOffset + j*numVertsPerSegment;
				var segmentFloatIndexOffset = segmentVertIndexOffset * numFloatsPerVertex;

				var pt0 = rootPosLeft.clone().add( deltaPos.clone().multiplyScalar(j) );
				var pt1 = rootPosRight.clone().add( deltaPos.clone().multiplyScalar(j) );
				var pt2 = rootPosRight.clone().add( deltaPos.clone().multiplyScalar(j+1) );
				var pt3 = rootPosLeft.clone().add( deltaPos.clone().multiplyScalar(j+1) );

				if ( j == numSegmentsPerBlade -1 )
				{
					pt2.x = rootPos.x;
					pt2.z = rootPos.z;
					pt3.x = rootPos.x;
					pt3.z = rootPos.z;
				}

				// pos
				positions[ segmentFloatIndexOffset + 0 ] = pt0.x;
				positions[ segmentFloatIndexOffset + 1 ] = pt0.y;
				positions[ segmentFloatIndexOffset + 2 ] = pt0.z;
				positions[ segmentFloatIndexOffset + 3 ] = pt1.x;
				positions[ segmentFloatIndexOffset + 4 ] = pt1.y;
				positions[ segmentFloatIndexOffset + 5 ] = pt1.z;
				positions[ segmentFloatIndexOffset + 6 ] = pt2.x;
				positions[ segmentFloatIndexOffset + 7 ] = pt2.y;
				positions[ segmentFloatIndexOffset + 8 ] = pt2.z;

				positions[ segmentFloatIndexOffset + 9 ] = pt0.x;
				positions[ segmentFloatIndexOffset + 10 ] = pt0.y;
				positions[ segmentFloatIndexOffset + 11 ] = pt0.z;
				positions[ segmentFloatIndexOffset + 12 ] = pt2.x;
				positions[ segmentFloatIndexOffset + 13 ] = pt2.y;
				positions[ segmentFloatIndexOffset + 14 ] = pt2.z;
				positions[ segmentFloatIndexOffset + 15 ] = pt3.x;
				positions[ segmentFloatIndexOffset + 16 ] = pt3.y;
				positions[ segmentFloatIndexOffset + 17 ] = pt3.z;

				colors[ segmentFloatIndexOffset + 0 ] = r;
				colors[ segmentFloatIndexOffset + 1 ] = g;
				colors[ segmentFloatIndexOffset + 2 ] = b;
				colors[ segmentFloatIndexOffset + 3 ] = r;
				colors[ segmentFloatIndexOffset + 4 ] = g;
				colors[ segmentFloatIndexOffset + 5 ] = b;
				colors[ segmentFloatIndexOffset + 6 ] = r;
				colors[ segmentFloatIndexOffset + 7 ] = g;
				colors[ segmentFloatIndexOffset + 8 ] = b;

				colors[ segmentFloatIndexOffset + 9 ] = r;
				colors[ segmentFloatIndexOffset + 10 ] = g;
				colors[ segmentFloatIndexOffset + 11 ] = b;
				colors[ segmentFloatIndexOffset + 12 ] = r;
				colors[ segmentFloatIndexOffset + 13 ] = g;
				colors[ segmentFloatIndexOffset + 14 ] = b;
				colors[ segmentFloatIndexOffset + 15 ] = r;
				colors[ segmentFloatIndexOffset + 16 ] = g;
				colors[ segmentFloatIndexOffset + 17 ] = b;

				data[ segmentFloatIndexOffset + 0 ] = bladeDataRandom0;
				data[ segmentFloatIndexOffset + 1 ] = rootPos.z
				data[ segmentFloatIndexOffset + 2 ] = delta*j;
				data[ segmentFloatIndexOffset + 3 ] = bladeDataRandom0;
				data[ segmentFloatIndexOffset + 4 ] = rootPos.z
				data[ segmentFloatIndexOffset + 5 ] = delta*j;
				data[ segmentFloatIndexOffset + 6 ] = bladeDataRandom0;
				data[ segmentFloatIndexOffset + 7 ] = rootPos.z
				data[ segmentFloatIndexOffset + 8 ] = delta*(j+1);

				data[ segmentFloatIndexOffset + 9 ] = bladeDataRandom0;
				data[ segmentFloatIndexOffset + 10 ] = rootPos.z
				data[ segmentFloatIndexOffset + 11 ] = delta*j;
				data[ segmentFloatIndexOffset + 12 ] = bladeDataRandom0;
				data[ segmentFloatIndexOffset + 13 ] = rootPos.z
				data[ segmentFloatIndexOffset + 14 ] = delta*(j+1);
				data[ segmentFloatIndexOffset + 15 ] = bladeDataRandom0;
				data[ segmentFloatIndexOffset + 16 ] = rootPos.z
				data[ segmentFloatIndexOffset + 17 ] = delta*(j+1);
			}
		}

		var attributes = {

			//position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			data: { type: 'f', value: null }

		};

		uniforms = {

			time: {type: 'f', value: 2.0}

		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderGrass' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderGrass' ).textContent,

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	false,

		});

		/*var vertexColorMaterial = new THREE.MeshBasicMaterial( 
			{ vertexColors: THREE.VertexColors, side: THREE.DoubleSide } );
*/

	    this.meshTerrain = new THREE.Mesh(
	        geo,
	        shaderMaterial
	    );
	    
	   // this.meshTerrain.doubleSided = true;
	    //this.meshTerrain.overdraw = false;
	    g_scene.add(this.meshTerrain);
	}

	this.init = function()
	{
		this.initTerrain();
		this.time = 0.0;
	}

	this.draw = function()
	{
		//this.meshTerrain.material.uniforms.time.value = Date.now() * 0.4;
		this.meshTerrain.material.uniforms.time.value = this.time;
		this.meshTerrain.material.needsUpdate = true;
	}

	this.update = function()
	{
		this.time += 1.5/60.0;
		//var test = this.meshTerrain.material.uniforms.time;
		

		//console.log( this.meshTerrain.material.uniforms.time.value );
	}
}