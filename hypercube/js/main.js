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
			shadow:new MascotShadow(),
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


g_stage.mousedown = function(mouseData){
	g_objs.get("head").onClick(mouseData);

	var posClick = mouseData.global;
	var screenSize = { x:window.innerWidth, y:window.innerHeight };
	var posClickNormalized = {x:posClick.x/screenSize.x, y:posClick.x/screenSize.y };
	var index = Math.floor (g_scale_0.length * posClickNormalized.x );
	var freq = g_scale_0[ index ];
	//osc.setFrequency( posClick.x );
	osc.setFrequency( freq );
}

g_stage.touchstart = function(mouseData){
	g_objs.get("head").onClick(mouseData);
}

document.body.appendChild(g_renderer.view);
var g_objs = new ObjManager();
g_objs.init();

requestAnimFrame( animate );

// C E G B
var g_scale_0 = [ 261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98, 1975.53, 2093.00, 2637.02, 3135.96, 3951.07 ];

var osc = new Tone.Oscillator(440, "triangle");
var vibrato = new Tone.LFO(6, -25, 25);
vibrato.start();

// feedback
var feedbackDelay = new Tone.PingPongDelay("8n");
feedbackDelay.setFeedback(0.7);
osc.connect(feedbackDelay);
feedbackDelay.toMaster();	
feedbackDelay.setWet(0.5);	

//connect it to the output
osc.toMaster();
osc.setVolume(-10);
vibrato.connect(osc.detune);
osc.start();