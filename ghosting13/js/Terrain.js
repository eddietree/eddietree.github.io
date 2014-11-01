var easeCubes = function(t)
{
	if ( t == 0.0 || t == 1.0 ) 
	{
		return t;
	}
	
	t *= 2.0;
	if ( t < 1 ) 
	{
		return 0.5 * Math.pow( 1024.0, t - 1 );
	}
	return 0.5 * ( -Math.pow( 2.0, -10.0 * ( t-1.0 ) ) + 2.0 );
}

var easeCubes = function(t)
{
	var s = 1.70158;
	t = t-1.0;
	return (t*t*((s+1.0)*t+s)+1.0);
}

var easeCubes = function(t)
{
	var s = 1.70158 * 1.525;
	t = t*2.0;

	if ( t < 1.0 )
	{
		return (0.5 * ( t * t * ( ( s + 1 ) * t - s ) ));
	}

	t -= 2.0;
	return (0.5 * ( t * t * ( ( s + 1 ) * t + s ) + 2.0 ));

	return (t*t*((s+1.0)*t+s)+1.0);
};

/*
var easeCubes = function(t)
{
	if (t==0.0 || t==1.0) 
	{
		return t;
	}

	var amp = 1.0;
	var period = 0.3;
	
	var pi2 = Math.PI*2.0;
	var s = period/pi2*Math.sin(1.0/amp);
	var result =  (amp*Math.pow(2.0,-10.0*t)*Math.sin((t-s)*pi2/period)+1.0);

	return result;
}*/

function Terrain()
{
	BaseObj.call(this);

	this.init = function()
	{
		var numCubesWidth = 11;
		var cubeWidth = 1.0;
		var cubeMargin = 0.5;
		var cubeRowWidth = numCubesWidth * (cubeWidth + cubeMargin );

		this.time = 0.0;
		this.cubes = new Array(numCubesWidth);
		this.cubeDistance = cubeWidth+cubeMargin;

		var count = 0;

		//var geometry = new THREE.BoxGeometry( cubeWidth, cubeWidth, cubeWidth );
		var geometry = new THREE.SphereGeometry( cubeWidth*0.5, 4, 4 );
		var material = new THREE.MeshBasicMaterial( { color: 0xB8C671, wireframe: false, } );
		var phongMaterial =  new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0xffffff, shininess: 30, shading: THREE.FlatShading } )

		this.light = new THREE.PointLight( 0xff0040, 2, 3 );
		scene.add(this.light);
		this.light.position.x = camera.position.x;
		this.light.position.y = camera.position.y;
		this.light.position.z = camera.position.z;

		for ( var x = 0; x < numCubesWidth; ++x )
		{
			for ( var y = 0; y < numCubesWidth; ++y )
			{
				for ( var z = 0; z < numCubesWidth; ++z )
				{
					var posX = -cubeRowWidth*0.5 + x * (cubeWidth + cubeMargin);
					var posY = -cubeRowWidth*0.5 + y * (cubeWidth + cubeMargin);
					var posZ = -cubeRowWidth*0.5 + z * (cubeWidth + cubeMargin);

					var cube = new THREE.Mesh( geometry, phongMaterial );

					cube.position.x = posX;
					cube.position.y = posY;
					cube.position.z = posZ;
					cube.rotation.y = this.time*100000.0;

					cube.index = {x:x, y:y, z:z};
					cube.positionBase = {x:posX, y:posY, z:posZ};

					this.light.add( cube );

					this.cubes[count] = cube;
					count++;
				}
			}
		}

		scene.fog = new THREE.FogExp2( 0x6D3E86, 0.25 );
		renderer.setClearColor( 0x6D3E86, 1);
	};

	this.release = function()
	{
		scene.fog = null;
		scene.remove(this.light);
		this.cubes = null;
	};

	this.update = function()
	{
		var cooldownTime = 0.0;
		var lerpTime = 3.0;

		this.time += g_dt;

		var time = this.time % (cooldownTime+lerpTime);
		var lerpFactor = clamp( (time-cooldownTime)/(lerpTime)  );

		lerpFactor = easeCubes(lerpFactor);

		var count = Math.floor(this.time / (cooldownTime+lerpTime) );
		var coeffX = count % 3 == 0;
		var coeffY = count % 3 == 1;
		var coeffZ = count % 3 == 2;

		this.updateCubes(lerpFactor, coeffX, coeffY, coeffZ);
	};

	this.updateCubes = function( lerpFactor, coeffX, coeffY, coeffZ )
	{
		var cubes = this.cubes;
		var numCubes = this.cubes.length;

		for (var i = 0; i < numCubes; i++ )
		{
			var cube = cubes[i];
			var index = cube.index;
			var posBase = cube.positionBase;
			var dist = this.cubeDistance * lerpFactor;

			var dirX = (index.x % 2)*2.0-1.0;
			var dirY = (index.y % 2)*2.0-1.0;
			var dirZ = (index.z % 2)*2.0-1.0;

			cube.rotation.y = Math.PI * lerpFactor * coeffX;
			cube.rotation.x = Math.PI * lerpFactor * coeffY;
			cube.rotation.z = Math.PI * lerpFactor * coeffZ;

			cube.position.x = posBase.x + dist*dirY * coeffX;
			cube.position.y = posBase.y + dist*dirZ * coeffY;
			cube.position.z = posBase.z + dist*dirX * coeffZ;
		}
	};
}