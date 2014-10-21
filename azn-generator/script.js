var data = 
[
	{
		male: ["lil", "wtfits", "asian", "azn", "big", "young", "biggie", "da", "yung", "rice"],
		female: ["cutie", "qt", "lil", "asian", "azn", "sweet", "da", "sweetie", "candy", "candi"]
	},

	{
		male: ["gangsta", "silly", "lazi", "lazy", "ball3r"],
		female: ["angel", "honey", "lazy"]
	},

	{
		male: ["thug", "namja", "boii", "bboi", "bboy", "4lyfe", "drifter", "dragon", "warrior"],
		female: ["baby", "babi", "4lyfe", "girl", "gurl", "bby", "princess", "face"]
	},

];

var imgs = 
{
	male: ["1.gif", "1.jpg", "2.gif", "2.jpg", "3.jpg", "7.jpg", "4.jpg", "11.jpg", "14.jpg", "15.jpg", "yellowbird.jpg", "16.jpg", "17.jpg", "18.jpg", "20.jpg", "21.jpg"],
	female: ["2.jpg", "3.jpg", "5.jpg", "6.jpg", "2.jpg", "8.jpg", "9.jpg", "10.jpg", "12.jpg", "13.jpg", "15.jpg", "19.jpg"],
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
		if ( chance(0.5) )
		{
			result = "xX" + result + "Xx";
		}
		else
		{
			result = "Xx" + result + "xX";
		}
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
        $("#img-profile").css("display", "block");
    }); 

});