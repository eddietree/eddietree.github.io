function Grass()
{
	this.id = 'grass';

	this.initTerrain = function()
	{
		var numBlades = 500;
		var maxDist = 20.0;
		var yMin = -10.0;
		var yMax = -5.0;
		var bladeWidth = 0.6;
		var numSegmentsPerBlade = 5;

		//var numVertsPerBlade = ((numSegmentsPerBlade-1)*2 + 4);
		var numVertsPerBlade = numSegmentsPerBlade * 6;
		var numVertsTotal = numVertsPerBlade * numBlades;
		var yHeight = yMax-yMin;

		/// generate geometry
		var geo = new THREE.BufferGeometry();

		geo.addAttribute( 'position', Float32Array, numVertsTotal, 3 );
		geo.addAttribute( 'color', Float32Array, numVertsTotal, 3 );

		var positions = geo.attributes.position.array;
		var colors = geo.attributes.color.array;

		var yDiff = new THREE.Vector3(0.0, yMax-yMin, 0.0);

		for ( var i = 0; i < numBlades; i ++ ) 
		{
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

			for ( var j = 0; j < numSegmentsPerBlade; j++ )
			{
				// color
				var delta = j / numSegmentsPerBlade;
				var r = 0.0;
				var g = delta;
				var b = 0.0;

				var numFloatsPerSegment =  18;
				var segmentVertIndexOffset = bladeVertIndexOffset + j*2;
				var segmentIndexOffset = segmentVertIndexOffset * numFloatsPerSegment;

				var pt0 = rootPosLeft.clone().add( deltaPos.clone().multiplyScalar(j) );
				var pt1 = rootPosRight.clone().add( deltaPos.clone().multiplyScalar(j) );
				var pt2 = rootPosRight.clone().add( deltaPos.clone().multiplyScalar(j+1) );
				var pt3 = rootPosLeft.clone().add( deltaPos.clone().multiplyScalar(j+1) );

				// po
				positions[ segmentIndexOffset + 0 ] = pt0.x;
				positions[ segmentIndexOffset + 1 ] = pt0.y;
				positions[ segmentIndexOffset + 2 ] = pt0.z;
				positions[ segmentIndexOffset + 3 ] = pt1.x;
				positions[ segmentIndexOffset + 4 ] = pt1.y;
				positions[ segmentIndexOffset + 5 ] = pt1.z;
				positions[ segmentIndexOffset + 6 ] = pt2.x;
				positions[ segmentIndexOffset + 7 ] = pt2.y;
				positions[ segmentIndexOffset + 8 ] = pt2.z;

				positions[ segmentIndexOffset + 9 ] = pt0.x;
				positions[ segmentIndexOffset + 10 ] = pt0.y;
				positions[ segmentIndexOffset + 11 ] = pt0.z;
				positions[ segmentIndexOffset + 12 ] = pt2.x;
				positions[ segmentIndexOffset + 13 ] = pt2.y;
				positions[ segmentIndexOffset + 14 ] = pt2.z;
				positions[ segmentIndexOffset + 15 ] = pt3.x;
				positions[ segmentIndexOffset + 16 ] = pt3.y;
				positions[ segmentIndexOffset + 17 ] = pt3.z;

				colors[ segmentIndexOffset + 0 ] = r;
				colors[ segmentIndexOffset + 1 ] = g;
				colors[ segmentIndexOffset + 2 ] = b;
				colors[ segmentIndexOffset + 3 ] = r;
				colors[ segmentIndexOffset + 4 ] = g;
				colors[ segmentIndexOffset + 5 ] = b;
				colors[ segmentIndexOffset + 6 ] = r;
				colors[ segmentIndexOffset + 7 ] = g;
				colors[ segmentIndexOffset + 8 ] = b;

				colors[ segmentIndexOffset + 9 ] = r;
				colors[ segmentIndexOffset + 10 ] = g;
				colors[ segmentIndexOffset + 11 ] = b;
				colors[ segmentIndexOffset + 12 ] = r;
				colors[ segmentIndexOffset + 13 ] = g;
				colors[ segmentIndexOffset + 14 ] = b;
				colors[ segmentIndexOffset + 15 ] = r;
				colors[ segmentIndexOffset + 16 ] = g;
				colors[ segmentIndexOffset + 17 ] = b;
			}
		}

		var vertexColorMaterial = new THREE.MeshBasicMaterial( 
			{ vertexColors: THREE.VertexColors, side: THREE.DoubleSide } );

	    this.meshTerrain = new THREE.Mesh(
	        geo,
	        vertexColorMaterial
	    );
	    this.meshTerrain.doubleSided = false;
	    this.meshTerrain.overdraw = false;
	    g_scene.add(this.meshTerrain);
	}

	this.init = function()
	{
		this.initTerrain();
	}

	this.draw = function()
	{
	}

	this.update = function()
	{
	}
}