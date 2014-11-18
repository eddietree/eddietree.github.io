function LightRay()
{
	this.init = function()
	{
		var rayRadius = 0.6;
		var rayAngle = Math.PI*0.15;
		var geometry = new THREE.CylinderGeometry( rayRadius, rayRadius, 30, 32 );
		var material = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.05, blending:THREE.AdditiveBlending ,transparent: true});
		var ray = new THREE.Mesh(geometry, material);

		ray.position = g_heroPos;
		ray.rotation.z = -rayAngle;

		g_scene.add(ray);
	}

	this.draw = function()
	{

	}

	this.update = function()
	{
	}
}