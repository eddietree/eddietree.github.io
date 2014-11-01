function ObjManager()
{
	this.init = function()
	{
		this.objs = 
		{
			terrain:new Terrain(),
			lines: new Lines(),
			spikes: new Spikes(),
			polybear:new Polybear(),
			//body:new MascotBody(),
			//head:new MascotHead(),
		};

		/*for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];
		        obj.init();
		    }
		}*/
	}

	this.activateObj = function( a_objName )
	{
		var obj = this.objs[a_objName];
		obj.active = true;
		obj.init();
	};

	this.deactivateAllObjs = function()
	{
		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];

		        if (  'release' in obj ) {
		        	obj.release();
		        	obj.active = false;
		        }
		    }
		}
	};

	this.update = function()
	{
		for (var property in this.objs ) {
		    if (this.objs.hasOwnProperty(property)) {
		        
		        var obj = this.objs[property];

		        if (  'update' in obj && obj.active) {
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

		        if (  'draw' in obj && obj.active ) {
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