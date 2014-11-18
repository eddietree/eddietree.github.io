function Hero()
{
	this.init = function()
	{
		var geometry = new THREE.CylinderGeometry( 0, 0.15, 0.5, 4 );
		var material = new THREE.MeshBasicMaterial({color: 0xffffff});
		var ray = new THREE.Mesh(geometry, material);

		ray.position = g_heroPos;

		g_scene.add(ray);
	}

	this.draw = function()
	{

	}

	this.update = function()
	{
	}
}