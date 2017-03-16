window.onload = function() {

	var mouseX = 0;
	var mouseY = 0;

	onmousemove = function(e)
	{
		mouseX = e.clientX;
		mouseY = e.clientY;
		//console.log("mouse location:", mouseX, mouseY);
	}

	function doMouseAvoid()
	{
		function calculateDistance(elem, mouseX, mouseY) {
	        return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
	    }
		var elem = $("#notification-on");

		var loop = animitter();

		loop.on('start', function(deltaTime, elapsedTime, frameCount){
		    console.log("START");
		    console.log(elem);
			console.log(elem.position().left);
		});

		loop.on('update', function(deltaTime, elapsedTime, frameCount){

			console.log(calculateDistance(elem, mouseX, mouseY));
			//console.log(elem.position().left+0.00001)
			//elem.css('left', elem.position().left+0.00001);
			//var elemRect = elem.getBoundingClientRect();

			//elem.style.right = 50;

			//console.log(elemRect.top - mouseY);
		});

		loop.start();   
	}

	doMouseAvoid();
};