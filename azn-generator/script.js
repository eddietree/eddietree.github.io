var data = 
[
	{
		male: ["lil", "asian", "azn", "big", "young", "biggie", "da", "yung"],
		female: ["lil", "asian", "azn", "sweet", "da", "sweetie"]
	},

	{
		male: ["gangsta", "silly", "lazi", "lazy"],
		female: ["angel", "honey", "lazy"]
	},

	{
		male: ["thug", "namja", "boii", "bboi", "bboy", "4lyfe", "drifter", "dragon", "warrior"],
		female: ["baby", "babi", "4lyfe", "girl", "gurl", "bby", "princess"]
	},

];

function chance( a_chance )
{
	return Math.random() < a_chance;
}

function randInt( min, max )
{
	return Math.floor(Math.random() * (max - min)) + min;
}

function generateName( a_name, a_gender )
{
	var result = "";

	var doAddSeparatorX = chance(0.25);
	var doAddSmiley = chance(0.25);

	for ( var i = 0; i < data.length; i++)
	{
		var selection = data[i][a_gender];
		result += selection[randInt(0, selection.length)];

		// add separating xs
		if ( doAddSeparatorX && i < data.length-1 )
		{
			result += "x";
		}
	}

	if ( doAddSmiley )
	{
		result += "xD";
	}

	return result;
}


$(function() {
    
    $("#btn-submit").click(function()
    {
        //alert("button");
        var name = $("#input-name").val();
        var gender = $("input:radio[name=gender]:checked").val();

        var result = generateName(name, gender);
        $("#name-result").text( result );
        //alert( result );
    }); 

});