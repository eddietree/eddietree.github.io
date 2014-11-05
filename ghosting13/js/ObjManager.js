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
			cubes:new CubeWorld(),
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

		console.log("Activated Object: " + a_objName); 
	};

	this.deactivateAllObjs = function()
	{
	 	Object.keys(this.objs).forEach(function(property) {
            var obj = this.objs[property];
            if (obj.release) {
              obj.release();
              obj.active = false;
            }
        }.bind(this));
	};

	this.update = function()
	{
		Object.keys(this.objs).forEach(function(property) {
            var obj = this.objs[property];
            if (obj.update && obj.active) {
              obj.update();
            }
        }.bind(this));
	}

	this.draw = function()
	{
		Object.keys(this.objs).forEach(function(property) {
            var obj = this.objs[property];
            if (obj.draw && obj.active) {
              obj.draw();
            }
        }.bind(this));
	}

	this.get = function( a_name )
	{
		return this.objs[a_name];
	}
}