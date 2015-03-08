function GetObj( a_name ) {
	return g_objs.get(a_name);
}

function ObjExists( a_name ) {
	return g_objs.exists(a_name);
}

function ObjManager()
{
	this.init = function()
	{
		this.objs = 
		{
			onion:new Onion(),
			particles:new Particles(),
			waves:new Waves(),
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

	this.exists = function( a_name )
	{
		//console.log( this.objs[a_name] );
		return (this.objs[a_name] != undefined)
			 || ( this.objs[a_name].active );
	}

	this.get = function( a_name )
	{
		return this.objs[a_name];
	}
}