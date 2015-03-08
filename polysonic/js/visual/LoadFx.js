function LoadFx()
{
	BaseObj.call(this);
	this.time = 0.0;

	this.init = function()
	{
		//this.mesh = new THREE.Line( this.getGeometry(), this.getShaderMaterial(), THREE.LinePieces );
		///scene.add(this.mesh);

		g_soundcloud.clearColor0 = new THREE.Color( 0xffff00 );
		//g_soundcloud.clearColor1 = new THREE.Color( 0xffff00 );

	};

	this.release = function()
	{
		g_soundcloud.clearColor0 = new THREE.Color( 0x38AF62 );
		//scene.remove(this.mesh);
		///this.mesh = null;
	};

	this.update = function()
	{
		this.time += g_dt;

		//renderer.setClearColor( 0xffffff, 1);
	};
}