function MascotBody()
{
	this.init = function()
	{
		var texture = PIXI.Texture.fromImage("img/Body01.png");
		this.obj = new PIXI.Sprite(texture);
		this.obj.anchor.x = 0.5;
		this.obj.anchor.y = 0.5;

		g_stage.addChild(this.obj);
	}

	this.update = function()
	{
		this.obj.position.x = window.innerWidth*0.5;
   	 	this.obj.position.y = window.innerHeight*0.5 + Math.sin(g_time*2.5)*10.0;
   	 	this.obj.scale.x = 0.5;
   	 	this.obj.scale.y = 0.5;
	}
}

function MascotHead()
{
	this.init = function()
	{
		var texture = PIXI.Texture.fromImage("img/Avatar.png");
		this.obj = new PIXI.Sprite(texture);
		this.obj.anchor.x = 0.5;
		this.obj.anchor.y = 0.5;
		g_stage.addChild(this.obj);

		this.pos_offset = {x:-160.0, y:-160.0};

  		/*var tween = new TWEEN.Tween( this.obj.position )
            .to( { x: window.innerWidth*0.5, y:window.innerHeight*0.5 }, 600 )
            .easing( TWEEN.Easing.Back.Out ).start();*/
	}

	this.update = function()
	{
		var base_pos = g_objs.get("body").obj.position;

		this.obj.position.x = base_pos.x + this.pos_offset.x;
   	 	this.obj.position.y = base_pos.y + this.pos_offset.y;

   	 	this.obj.rotation += 0.01;
   	 	this.obj.scale.x = 0.25;
   	 	this.obj.scale.y = 0.25;
	}
}
