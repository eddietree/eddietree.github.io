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

 		this.background = new Path.Rectangle(view.bounds);
		this.background.fillColor = '#EDEA67';
	}

	this.update = function()
	{
		//console.log(this.background);
		//this.background.width = view.viewSize.width;

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

function LineTest()
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
		//console.log(segment.point);
		segment.point.x = view.viewSize.width/2;
		segment.point.y = view.viewSize.height/2;
	}
}

function Flower()
{
	this.init = function()
	{
		var numPetals = 24;
		var deltaAngle = 2 * Math.PI / numPetals;

		var radiusStart = 50.0;
		var radiusEnd = 200.0;

		this.petals = new Array();

		var center = new Point( view.viewSize.width/2, view.viewSize.height/2 );

		var petalStyle = {
				fillColor: '#F3D110',
				strokeColor: '#BC9D04',
				strokeWidth: 2,
			};

		for ( var i = 0; i < numPetals; i++ )
		{
			var angle = i * deltaAngle;

			var dir = new Point( Math.cos(angle), Math.sin(angle) );
			var dirOpp = new Point( dir.y, -dir.x );

			var posStart = center + dir * radiusStart;
			var posEnd = center + dir * radiusEnd;
			var posMidle = (posStart+posEnd)*0.5;

			var posSide1 = posMidle + dirOpp * 15.0;
			var posSide2 = posMidle - dirOpp * 15.0;

			var segments = [posStart, posSide1, posEnd ];
			var path0 = new Path(segments);

			path0.style = petalStyle;
			//path0.closed = true;
			path0.smooth();

			var segments = [posStart, posSide2, posEnd];
			var path1 = new Path(segments);
			path1.style = petalStyle;
			path1.smooth();

			var petal = 
			{
				dir : dir,
				dirOpp : dirOpp,
				index : i,
				posStart : posStart,
				posEnd : posEnd,

				path0: path0,
				path1 : path1
			};

			this.petals.push(petal);
			//console.log(pos0);
		}
	}

	this.update = function()
	{
		var time = g_time * 3;

		var center = new Point( view.viewSize.width/2, view.viewSize.height/2 );
		var radius = Math.min( view.viewSize.width, view.viewSize.height ) * 0.5;
		var radiusStart = radius * 0.2;
		var radiusEnd = radius * 0.8;

		for ( var i = 0; i < this.petals.length; i++ )
		{
			var petal = this.petals[i];

			var path0 = petal.path0;
			var path1 = petal.path1;
			var dir = petal.dir;
			var dirOpp = petal.dirOpp;

			var posStart = petal.posStart;
			var posEnd = petal.posEnd;

			//var posStart = center + dir * radiusStart;
			//var posEnd = center + dir * radiusEnd;
			var posMiddle = (posStart+posEnd)*0.5;


			//path1.rotate(0.3);

			//path0.segments[0].point = posStart;
			//path0.segments[1].point = posMiddle + dirOpp * Math.cos( time  + i) * 15.0;
			//path0.segments[2].point = posEnd;
			
			path1.segments[0].point = posStart;
			path1.segments[1].point = posMiddle - dirOpp * Math.cos( time  + i) * 15.0;
			path1.segments[2].point = posEnd;


			path0.rotate(0.4);
		}
	}
}

var g_core = new Core();
g_core.init();
//g_core.add( "linetest", new LineTest() );
g_core.add( "flower", new Flower() );

var g_time = 0.0;

function onFrame(event) 
{
	g_core.update();
	g_time = event.time;

	//console.log(event.time);
	//path.rotate(event.time);
}