function SuperFormula()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.u_m = 3;
		this.u_n1 = 2;
		this.u_n2 = 5;
		this.u_n3 = 7;
		this.time = 0.0;

		var gui = new dat.GUI();
		gui.add(this, 'u_m', 0.0, 10.0);
		gui.add(this, 'u_n1', 0.0, 20.0);
		gui.add(this, 'u_n2', 0.0, 20.0);
		gui.add(this, 'u_n3', 0.0, 20.0);
		gui.add(this, 'time', 1.0, 5.0);


		renderer.setClearColor( 0xCCCCCC, 1);

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			//data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 1.0},
			u_m: {type: 'f', value: 2.0},
			u_n1: {type: 'f', value: 2.0},
			u_n2: {type: 'f', value: 1.0},
			u_n3: {type: 'f', value: 1.0},
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			//attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderSuperFormula' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderSuperFormula' ).textContent,

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	false,
		});


		var geometry = new THREE.SphereGeometry( 1, 64, 64 );
		this.mesh = new THREE.Line( geometry, shaderMaterial, THREE.LineStrip  );
		scene.add( this.mesh );


		//var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		//var sphere = new THREE.Mesh( geometry, material );
	};

	this.release = function()
	{
		scene.remove(this.mesh);
		this.mesh = null;
	};

	this.update = function()
	{
		var radius = 5.5;
		//camera.position.x = 0;
		camera.position.y = 0;
		camera.position.x = radius * Math.cos(this.time); 
		camera.position.z = radius * Math.sin(this.time);
		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );


		this.time += g_dt;
		this.mesh.material.uniforms.time.value = this.time;

		this.mesh.material.uniforms.u_m.value = this.u_m;
		this.mesh.material.uniforms.u_n1.value = this.u_n1;
		this.mesh.material.uniforms.u_n2.value = this.u_n2;
		this.mesh.material.uniforms.u_n3.value = this.u_n3;
	};
}