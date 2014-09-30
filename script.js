// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


var g_canvas = document.getElementById("draw-area");
var g_ctx = g_canvas.getContext("2d");


function resizeCanvas() {
	if ( g_canvas.width != window.innerWidth || g_canvas.height != window.innerHeight)
	{
    	g_canvas.width = window.innerWidth;
    	g_canvas.height = window.innerHeight-1;
    }
}

(function animloop(){
  requestAnimFrame(animloop);
  resizeCanvas();
  render();
})();

/******************/

function render()
{
	g_ctx.fillStyle = "#FF0000";
	g_ctx.fillRect(0,0,1550,75);
}
