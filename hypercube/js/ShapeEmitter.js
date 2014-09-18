function ShapeEmitter()
{
	this.init = function()
	{
		this.gfx = new PIXI.Graphics();
		g_stage.addChild(this.gfx);

		this.objs = new Array(128);
		this.index = 0;
		this.count = 0;
	}

	this.allocObj = function()
	{
		if ( this.count < this.objs.length )
		{
			var obj = {x:0, y:0, dead:false};
			this.objs[this.index] = obj;
			this.count += 1;
		}

		var obj = this.objs[this.index];
		obj.dead = false;

		this.index += 1;
		if ( this.index >= this.objs.length ) this.index = 0;

		return obj;
	}

	this.spawnAt = function( posX, posY )
	{
		var obj = this.allocObj();

		obj.x = posX;
		obj.y = posY;
		obj.radius = 1.0;
		obj.alpha = 1.0;

		var tween = new TWEEN.Tween( obj )
	            .to( { radius: 50.0, alpha:0.0 }, 1200 )
	            .easing( TWEEN.Easing.Quadratic.Out )
	            .onComplete( function() { this.dead = true;})
	            .start();
	};

	this.drawBgLines = function()
	{
		this.gfx.lineStyle(2, 0x080808);

		var deltaX = window.innerWidth / g_scale_0.length;
		var y0 = 0;
		var y1 = window.innerHeight;

		for ( var i = 0; i < g_scale_0.length; i+=1 )
		{
			var x = i * deltaX;
			this.gfx.moveTo( x, y0 );
			this.gfx.lineTo( x, y1 );
		}
	}

	this.update = function()
	{
		this.gfx.clear();
		this.drawBgLines();

		for( var i = 0; i < this.count; i+=1 )
		{
			var obj = this.objs[i];

			if ( !obj.dead )
			{
				this.gfx.lineStyle(2, 0xFFFFFF, obj.alpha);
				this.gfx.drawCircle( obj.x, obj.y, obj.radius );
			}
		}
	}
}
