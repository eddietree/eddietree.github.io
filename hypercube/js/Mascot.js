function MascotShadow()
{
	this.init = function()
	{
		var texture = PIXI.Texture.fromImage("img/Shadow.png");
		this.obj = new PIXI.Sprite(texture);
		this.obj.anchor.x = 0.5;
		this.obj.anchor.y = 0.5;

		g_stage.addChild(this.obj);
	}

	this.update = function()
	{
		var y_offset = 260.0;

		this.obj.position.x = window.innerWidth*0.5;
   	 	this.obj.position.y = window.innerHeight*0.5 + y_offset;
   	 	this.obj.scale.x = 0.5;
   	 	this.obj.scale.y = 0.5;
	}
}

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
		var y_offset = 50.0;

		this.obj.position.x = window.innerWidth*0.5;
   	 	this.obj.position.y = window.innerHeight*0.5 + y_offset + Math.sin(g_time*2.5)*10.0;
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
		this.obj.position.x = 300.0;
		this.obj.position.y = 300.0;

		g_stage.addChild(this.obj);

		this.pos_offset = {x:-160.0, y:-160.0};
		this.connected = false;
	}

	this.getBasePos = function()
	{
		var base_pos = g_objs.get("body").obj.position;
		var x = base_pos.x + this.pos_offset.x;
   	 	var y = base_pos.y + this.pos_offset.y;

   	 	return {x:x, y:y};
	}

	this.isPtInSlot = function( pos )
	{
		var base_pos = this.getBasePos();
		var radius = 80.0;

		var diff_x = pos.x - base_pos.x;
		var diff_y = pos.y - base_pos.y;
		
		return (diff_x*diff_x + diff_y*diff_y) < (radius*radius);
	}

	this.onConnected = function(posClick)
	{
		var basePos = this.getBasePos();

		var tween = new TWEEN.Tween( this.obj.position )
	            .to( { x: basePos.x, y:basePos.y }, 700 )
	            .easing( TWEEN.Easing.Back.Out ).start();
	}

	this.onDisconnected = function(posClick)
	{
		
	}

	this.onClick = function( mouseData )
	{
		var posClick = mouseData.global;

		if ( this.isPtInSlot(posClick) )
		{
			if ( !this.connected )
			{
				this.connected = true;
				this.onConnected(posClick);
			}
		}
		else
		{
			var tween = new TWEEN.Tween( this.obj.position )
	            .to( { x: posClick.x, y:posClick.y }, 800 )
	            .easing( TWEEN.Easing.Elastic.Out ).start();

	        if ( this.connected )
	        {
				this.connected = false;
				this.onDisconnected(posClick);
			}
		}

		var posClick = mouseData.global;
		var screenSize = { x:window.innerWidth, y:window.innerHeight };
		var posClickNormalized = {x:posClick.x/screenSize.x, y:posClick.x/screenSize.y };
		var numNotes = g_scale_0.length;
		var index = Math.floor(numNotes * posClickNormalized.x ) % numNotes;
		var freq = g_scale_0[ index ];
		osc.setFrequency( freq );
	}

	this.update = function()
	{
		if ( this.connected ) {

			//var base_pos = this.getBasePos();
			//this.obj.position.x = base_pos.x;
	   	 	//this.obj.position.y = base_pos.y;
	   	 	
	   	 	g_stage.setBackgroundColor(0xFFACA1);
	   	 }
	   	 else
	   	 {
	   	 	//var color = Math.floor(Math.random()*16777215);//.toString(16);
	   	 	g_stage.setBackgroundColor(0x00);
	   	 }

	   	this.obj.scale.x = 0.25;
	   	this.obj.scale.y = 0.25;
	   	this.obj.rotation += 0.01;
	}
}