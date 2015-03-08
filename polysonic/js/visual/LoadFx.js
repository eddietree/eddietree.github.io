function LoadFx()
{
	BaseObj.call(this);
	this.time = 0.0;

	this.init = function()
	{

		// bg
		g_soundcloud.clearColor0 = new THREE.Color( 0xD60062 );

		var numBoxes = 10;
		var boxWidthCoeff = 0.1;
		var boxPaddingCoeff = 0.1;

		// boxes
		this.meshes = new Array( numBoxes );
		for ( var i=0; i < numBoxes; i+=1 )
		{
			var totalWidth = ( boxWidthCoeff + boxPaddingCoeff ) * numBoxes;
			var x = totalWidth*-0.5 + i * (boxWidthCoeff + boxPaddingCoeff );

			var geometry = new THREE.BoxGeometry( boxWidthCoeff, 1, 0.01 );
			var material = new THREE.MeshBasicMaterial( { color : new THREE.Color( 0xff00ff ) } );
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = x;

			this.meshes[i] = mesh;

			scene.add( mesh );
		}
	};

	this.release = function()
	{
		g_soundcloud.clearColor0 = new THREE.Color( 0x38AF62 );

		if ( this.meshes )
		{
			for ( var i=0; i < this.meshes.length; i+=1 )
			{
				scene.remove(this.meshes[i]);
				this.meshes[i] = null;
			}
		}
	};

	this.update = function()
	{
		this.time += g_dt;

		//renderer.setClearColor( 0xffffff, 1);
	};
}