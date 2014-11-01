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