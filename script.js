// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function ObjManager()
{
	this.init = function()
	{
		this.objs = 
		{
			sun: new Sun(),
			//shapes:new ShapeEmitter(),
			//shadow:new MascotShadow(),
			//body:new MascotBody(),
			//head:new MascotHead(),
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

		        if (  'update' in obj ) {
		        	obj.update();
		        }
		    }
		}
	}

	this.draw = function()
	{
		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];

		        if (  'draw' in obj ) {
		        	obj.draw();
		        }
		    }
		}
	}

	this.get = function( a_name )
	{
		return this.objs[a_name];
	}
}

function Sun()
{
	this.init = function()
	{
	};

	this.update = function()
	{
	};

	this.draw = function()
	{
		// element pos/radius
		var elemImg = document.getElementById("img-header").getBoundingClientRect();
		var posX = ( elemImg.left + elemImg.right ) * 0.5;
		var posY = ( elemImg.top + elemImg.bottom ) * 0.5;
		var radius = (elemImg.right - elemImg.left)*0.5;

		var numCircles = 10;
		var deltaCircle = 20.0;

		for ( var i = 0; i < numCircles; i+=1 )
		{
			var pulsate = Math.sin(g_time*3.5 + i*0.65) * 0.5 + 0.5;
			var circleRadius = radius + 50.0 + deltaCircle*(numCircles - i) + deltaCircle * 1.5 * pulsate;

			//g_ctx.fillStyle = i%2==0 ? "#600CAC" : "#6997D3";
			g_ctx.strokeStyle = "white";
			g_ctx.beginPath();
			g_ctx.arc( posX, posY, circleRadius, 0, 2.0 * Math.PI );
			g_ctx.stroke();
			//g_ctx.fill();
		}
			
		//g_ctx.strokeRect( elemImg.left, elemImg.top, elemImg.right-elemImg.left, elemImg.bottom-elemImg.top);
	};
}

var g_canvas = document.getElementById("draw-area");
var g_ctx = g_canvas.getContext("2d");
var g_dt = 1.0 / 60.0;
var g_time = 0.0;

// objs
var g_objs = new ObjManager();
g_objs.init();

function resizeCanvas() {
	if ( g_canvas.width != window.innerWidth || g_canvas.height != window.innerHeight)
	{
    	g_canvas.width = window.innerWidth;
    	g_canvas.height = window.innerHeight;
    }
}

/******************/

function render()
{
	g_ctx.fillStyle="orange";
	g_ctx.fillRect(0,0, g_canvas.width, g_canvas.height);

	g_objs.update();
	g_objs.draw();
}

(function animloop(){
  requestAnimFrame(animloop);
  resizeCanvas();
  render();
  g_time += g_dt;
})();