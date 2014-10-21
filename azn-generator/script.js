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

var imgs = 
{
	male: ["1.jpg", "2.jpg", "3.jpg", "1.gif"],
	female: ["1.jpg", "2.jpg", "3.jpg"],
};

var g_seed = 1;

function random() {
    var x = Math.sin(g_seed++) * 10000;
    return x - Math.floor(x);
}

function randSeed( a_seed )
{
	g_seed = a_seed;
}

function chance( a_chance )
{
	return random() < a_chance;
}

function randInt( min, max )
{
	return Math.floor(random() * (max - min)) + min;
}

function calcSeedFromName( a_name )
{
	var result = 0;
	var name = a_name.toUpperCase();

	for ( var i = 0; i < name.length; i++ )
	{
		result += name.charCodeAt(i);
	}

	return result;
}

function randomizeCaps( a_name )
{
	var result = "";

	for ( var i = 0; i < a_name.length; i++ )
	{
		if ( chance(0.25) )
		{
			result += a_name.slice(i,i+1).toUpperCase();
		}
		else
		{
			result += a_name.slice(i,i+1);
		}
	}

	return result;
}

function generateName( a_name, a_gender )
{
	var result = "";
	var seed = calcSeedFromName(a_name);
	randSeed(seed);

	var doAddSeparatorX = chance(0.25);
	var doAddSmiley = chance(0.25);
	var doAddXoxo = chance(0.25);

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

	result = randomizeCaps( result );

	if ( doAddSmiley )
	{
		result += "xD";
	}

	if ( doAddXoxo )
	{
		result = "xX" + result + "Xx";
	}

	return result;
}

$(function() {
    
    $("#btn-submit").click(function()
    {
        var name = $("#input-name").val();
        var gender = $("input:radio[name=gender]:checked").val();

        var result = generateName(name, gender);
        $("#name-result").text( result );


        var imgOfGender = imgs[gender];
        var randImg = imgOfGender[ randInt(0, imgOfGender.length) ];
        var randImgPath = "img/" + randImg;
        $("#img-profile").attr("src", randImgPath);
    }); 

});