function resize()
{
	var num_pixel_offset = 3;

     if(window.innerWidth != g_currentWindowWidth){
     	g_renderer.resize(window.innerWidth-num_pixel_offset, window.innerHeight-num_pixel_offset);

        //renderer.view.style.width = window.innerWidth + "px";
		//renderer.view.style.height = window.innerHeight + "px";
        g_currentWindowWidth = window.innerWidth-num_pixel_offset;
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
		this.obj.position.x = window.innerWidth*0.5;
   	 	this.obj.position.y = window.innerHeight*0.5;
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
	}

	this.update = function()
	{
		this.obj.position.x = window.innerWidth*0.5;
   	 	this.obj.position.y = window.innerHeight*0.5;
   	 	this.obj.rotation += 0.01;
	}
}

function ObjManager()
{
	this.init = function()
	{
		this.objs = 
		{
			head:new MascotHead(),
			body:new MascotBody()
		};

		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];
		        obj.init();
		    }
		}
	}

	this.update = function()
	{
		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];
		        obj.update();
		    }
		}
	}

	this.get = function( a_name )
	{
		return this.objs[a_name];
	}
}

function animate() {

    requestAnimFrame( animate );
    resize();

    g_objs.update();

    // render the stage
    g_renderer.render(g_stage);
}

var g_currentWindowWidth = 0;
var g_stage = new PIXI.Stage(0xFFACA1);
var g_renderer = new PIXI.WebGLRenderer(1, 1);//autoDetectRenderer(400, 300);
document.body.appendChild(g_renderer.view);
var g_objs = new ObjManager();
g_objs.init();

requestAnimFrame( animate );
