function Mask()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.time = 0.0;
		renderer.setClearColor( 0x0fffff, 1);
	};

	this.release = function()
	{
	};

	this.update = function()
	{
		this.time += g_dt;
		//this.mesh.material.uniforms.time.value = this.time;
	};
}