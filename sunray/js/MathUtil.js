function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function lerp(a, b, alpha) { 
	return a + (b-a) * alpha; 
};