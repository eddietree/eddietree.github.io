function Grass()
{
	this.id = 'grass';

	this.initTerrain = function()
	{
		var colorFloor = 0x79A836;

		/// generate geometry
		var geo = new THREE.Geometry();

		var numBlades = 800;
		var maxDist = 20.0;
		var yMin = -10.0;
		var yMax = -5.0;
		var bladeWidth = 0.6;

		var yDiff = new THREE.Vector3(0.0, yMax-yMin, 0.0);

		for ( var i = 0; i < numBlades; i ++ ) 
		{
			var rootPos = new THREE.Vector3( randFloat(-maxDist, maxDist), yMin, randFloat(-maxDist, maxDist) );
			
			var bladeAngle = randFloat(0.0, Math.PI*2.0);
			var bladeDirNormalized = new THREE.Vector3( Math.cos(bladeAngle), 0.0, Math.sin(bladeAngle) ); 
			var bladeDir = bladeDirNormalized.clone().multiplyScalar(-bladeWidth*0.5);

			var rootPosLeft = rootPos.clone().add(bladeDir); 
			var rootPosRight = rootPos.clone().sub(bladeDir); 
			var topPosLeft = rootPosLeft.clone().add(yDiff);
			var topPosRight = rootPosRight.clone().add(yDiff);

			geo.vertices.push( rootPosLeft );
			geo.vertices.push( rootPosRight );
			geo.vertices.push( topPosRight );
			geo.vertices.push( topPosLeft );
		}

		// init faces
		for ( var i = 0; i < numBlades; i ++ ) 
		{
			var colorFloor = new THREE.Color();
			var cube_color_val = randFloat(0.5,1) ;
			colorFloor.setRGB( 0.5, cube_color_val, 0.2 );

			// face top
			var face = new THREE.Face3( i*4, i*4+1, i*4+2 );
			face.color = colorFloor;
			geo.faces.push( face );

			// face top
			var face = new THREE.Face3( i*4, i*4+2, i*4+3 );
			face.color = colorFloor;
			geo.faces.push( face );
		}

		var vertexColorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

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