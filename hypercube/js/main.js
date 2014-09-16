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

function ObjManager()
{
	this.init = function()
	{
		this.objs = 
		{
			body:new MascotBody(),
			head:new MascotHead(),
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

function animate(time) {

    requestAnimFrame( animate );
    TWEEN.update( time );
    resize();

    g_time += 1.0/60.0;
    g_objs.update();

    // render the stage
    g_renderer.render(g_stage);
}

var g_currentWindowWidth = 0;
var g_stage = new PIXI.Stage(0xFFACA1);
var g_renderer = new PIXI.WebGLRenderer(1, 1);//autoDetectRenderer(400, 300);
var g_time = 0.0;

document.body.appendChild(g_renderer.view);
var g_objs = new ObjManager();
g_objs.init();

requestAnimFrame( animate );
