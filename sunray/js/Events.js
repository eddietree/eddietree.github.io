document.onkeypress=function(e)
{
	var e=window.event || e;
	var keycodeRaw = e.charCode || e.keyCode;
	var keycodeStr = String.fromCharCode(keycodeRaw).toLowerCase();

	if ( keycodeStr == 's' )
	{
		var obj = getObj('terrain');
		obj.speedMove = 0.1;
	}

	//alert("CharCode value: "+e.keyCode)
	//alert("Character: "+String.fromCharCode(e.charCode))
}