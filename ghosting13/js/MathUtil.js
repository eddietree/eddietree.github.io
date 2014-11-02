 var lerp = function(start, end, alpha) {
    return start + (end-start) * alpha;
  };

  var randInt = function( min, max ) {
    return Math.floor( min + (max-min)*Math.random() );
  };

  var randFloat = function( min, max ) {
    return min + (max-min)*Math.random();
  };

  var clamp = function( val ) {
    return Math.min( Math.max( val, 0.0 ), 1.0 );
  };

  var smoothstep = function(edge0, edge1, x)
  {
      // Scale, bias and saturate x to 0..1 range
      x = Math.min(Math.max((x - edge0)/(edge1 - edge0), 0.0), 1.0); 
      // Evaluate polynomial
      return x*x*(3 - 2*x);
  }

var easeCubicInOut = function(t)
{
	if ( t == 0.0 || t == 1.0 ) 
	{
		return t;
	}
	
	t *= 2.0;
	if ( t < 1 ) 
	{
		return 0.5 * Math.pow( 1024.0, t - 1 );
	}
	return 0.5 * ( -Math.pow( 2.0, -10.0 * ( t-1.0 ) ) + 2.0 );
}

var easeSpring = function(t)
{
	var s = 1.70158;
	t = t-1.0;
	return (t*t*((s+1.0)*t+s)+1.0);
}

var easeBounceInOut = function(t)
{
	var s = 1.70158 * 1.525;
	t = t*2.0;

	if ( t < 1.0 )
	{
		return (0.5 * ( t * t * ( ( s + 1 ) * t - s ) ));
	}

	t -= 2.0;
	return (0.5 * ( t * t * ( ( s + 1 ) * t + s ) + 2.0 ));

	return (t*t*((s+1.0)*t+s)+1.0);
};



/*
var easeCubes = function(t)
{
	if (t==0.0 || t==1.0) 
	{
		return t;
	}

	var amp = 1.0;
	var period = 0.3;
	
	var pi2 = Math.PI*2.0;
	var s = period/pi2*Math.sin(1.0/amp);
	var result =  (amp*Math.pow(2.0,-10.0*t)*Math.sin((t-s)*pi2/period)+1.0);

	return result;
}*/