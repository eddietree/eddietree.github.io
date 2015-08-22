function SuperFormula()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.time = 0.0;
		renderer.setClearColor( 0xCCCCCC, 1);

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			//data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 2.0}
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
		var radius = 2.0;
		//camera.position.x = 0;
		camera.position.y = 0;
		camera.position.x = radius * Math.cos(this.time); 
		camera.position.z = radius * Math.sin(this.time);
		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );


		this.time += g_dt;
		this.mesh.material.uniforms.time.value = this.time;
	};
}