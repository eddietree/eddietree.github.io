function LoadFx()
{
	BaseObj.call(this);
	this.time = 0.0;

	this.init = function()
	{
		// bg
		g_soundcloud.clearColor0 = new THREE.Color( 0xE61072 );

		var numBoxes = 20;
		var boxWidthCoeff = 0.05;
		var boxHeightCoeff = 0.5;
		var boxPaddingCoeff = 0.05;

		// boxes
		this.meshes = new Array( numBoxes );
		for ( var i=0; i < numBoxes; i+=1 )
		{
			var totalWidth = ( boxWidthCoeff + boxPaddingCoeff ) * numBoxes;
			var x = totalWidth*-0.5 + i * (boxWidthCoeff + boxPaddingCoeff );

			var geometry = new THREE.BoxGeometry( boxWidthCoeff, boxHeightCoeff, 0.01 );
			var material = new THREE.MeshBasicMaterial( { color : new THREE.Color( 0x333333 ) } );
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = x;

			this.meshes[i] = mesh;
			scene.add( mesh );
		}
	};

	this.setLoadingPercent = function( a_percent )
	{
		if ( this.meshes )
		{
			var indexPercent = Math.floor( a_percent * this.meshes.length );

			for ( var i=0; i < this.meshes.length; i+=1 )
			{
				var mesh = this.meshes[i];
				if ( i < indexPercent )
				{
					mesh.material.color.setHex(0xffffff);
				}
			}
		}
	};

	this.release = function()
	{
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
	};
}