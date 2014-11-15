precision highp float;
precision mediump int;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;
varying vec4 vData;
varying vec4 vAudioData;
varying float vTime;

void main() {
	//gl_FragColor = vec4( vData.z, vData.w, 0.0, 1.0 );
	gl_FragColor = vColor;
}