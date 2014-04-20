function Core()
{
	this.init = function()
	{
		this.objects  = new Array();
		this.objectsMap  = new Object();
		
		for( var i=0; i < this.objects.length; i++ )
 		{
 			this.objects[i].init();
 		}
	}

	this.update = function()
	{
		for( var i=0; i < this.objects.length; i++ )
 		{
 			this.objects[i].update();
 		}
	}

	this.add = function( a_id, a_item )
	{
		this.objectsMap[a_id] = a_item;
		this.objects.push( a_item );

		a_item.init();
	}

	this.get = function( a_id )
	{
		return this.objects[a_id];
	}
}

function Flower()
{
	this.init = function()
	{
		// Create a Paper.js Path to draw a line into it:
		var path = new Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		var start = new Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note the plus operator on Point objects.
		// PaperScript does that for us, and much more!
		path.lineTo(start + [ 100, -50 ]);

		this.path = path;
	}

	this.update = function()
	{
		var segment = this.path.segments[0];
		//console.log(view.size);
		console.log(segment.point);
		segment.point.x = view.viewSize.width/2;
		segment.point.y = view.viewSize.height/2;
	}
}

var g_core = new Core();
g_core.init();
g_core.add( "flower", new Flower() );

function onFrame(event) 
{
	g_core.update();

	//console.log(event.time);
	//path.rotate(event.time);
}