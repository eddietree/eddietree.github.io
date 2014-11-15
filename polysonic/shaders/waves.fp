precision highp float;
precision mediump int;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;
varying vec4 vData;
varying float vTime;

void main() {
	float alpha = 1.0-vData.w;

	gl_FragColor = vColor * vec4(1.0,1.0,1.0,alpha);
}