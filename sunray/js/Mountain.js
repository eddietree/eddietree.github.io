function Mountain()
{
	this.initPts = function()
	{
		var geo = new THREE.Geometry();

		var numRocks = 4;

		for ( var i =0; i < numRocks; i++ )
		{
			var colorBush_0 = new THREE.Color( 0x1F5247 );
			var colorBush_1 = new THREE.Color( 0x487A3D );
			var colorBush = colorBush_0.clone();
			colorBush.lerp( colorBush_1, randFloat(0.0,1.0) );

			var angle = randFloat( 0.0, 2.0 * Math.PI );
			var radius = randFloat( 1.0, 3.0 );

			var dir_x = Math.cos(angle);
			var dir_z = Math.sin(angle);

			var posCenter_x = g_heroPos.x + dir_x * radius;  
			var posCenter_z = g_heroPos.z + dir_z * radius;  
			var posCenter_y = randFloat(0.1,0.15);

			var numSides = randInt(3,4);
			var angleDelta = 2.0 * Math.PI / numSides;
			var sideRadius = randFloat(0.1,0.3);

			// index
			var indexStart = geo.vertices.length;
			var indexCenter = indexStart + numSides;

			for( var j = 0; j < numSides; j++ )
			{
				var sideAngle = j * angleDelta;

				var dirSide_x = Math.cos(sideAngle);
				var dirSide_z = Math.sin(sideAngle);
				var pos_x = posCenter_x + dirSide_x * sideRadius;  
				var pos_z = posCenter_z + dirSide_z * sideRadius;  
				var pos_y = 0.0;

				geo.vertices.push( new THREE.Vector3(pos_x, pos_y, pos_z));
			}

			geo.vertices.push( new THREE.Vector3(posCenter_x, posCenter_y, posCenter_z));

			for( var j = 0; j < numSides; j++ )
			{
				var face = new THREE.Face3(indexStart+j, indexCenter, (indexStart+(j+1)%numSides));
				face.color = colorBush;
				geo.faces.push( face );
			}
		}

	    var mesh = new THREE.Mesh(
	        geo,
	        new THREE.MeshBasicMaterial({
	            //color:              0xFF0000,
	            //wireframe:          false,
	            //wireframeLinewidth: 3,
	            vertexColors: THREE.VertexColors
	        })
	    );
	    mesh.doubleSided = true;
	    mesh.overdraw = true;
	    g_scene.add(mesh);
	}

	this.init = function()
	{
		this.initPts();
	}

	this.draw = function()
	{

	}

	this.update = function()
	{
	}
}