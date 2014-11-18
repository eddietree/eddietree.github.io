function Particles()
{
	this.init = function()
	{
		var particles = 32;

		var geometry = new THREE.BufferGeometry();

		geometry.addAttribute( 'position', Float32Array, particles, 3 );
		geometry.addAttribute( 'color', Float32Array, particles, 3 );

		var positions = geometry.attributes.position.array;
		var colors = geometry.attributes.color.array;

		var color = new THREE.Color();
		var center = g_heroPos;

		var spread = 2.5;

		for ( var i = 0; i < positions.length; i += 3 ) {

			// positions

			var x = center.x + randFloat( -spread, spread );
			var y = randFloat( 0.1, spread*0.5 );
			var z = center.z + randFloat( -spread, spread );

			positions[ i ]     = x;
			positions[ i + 1 ] = y;
			positions[ i + 2 ] = z;

			// colors
			color.setRGB( 1,1,1);

			colors[ i ]     = color.r;
			colors[ i + 1 ] = color.g;
			colors[ i + 2 ] = color.b;

		}

		geometry.computeBoundingSphere();

		//

		var material = new THREE.ParticleSystemMaterial( { size: 0.04, vertexColors: true } );

		particleSystem = new THREE.ParticleSystem( geometry, material );
		g_scene.add( particleSystem );
	}

	this.draw = function()
	{

	}

	this.update = function()
	{
	}
}