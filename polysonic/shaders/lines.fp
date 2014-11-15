precision highp float;
precision mediump int;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec4 vColor;
varying vec4 vData;
varying vec4 vAudioData;
varying float vTime;

void main() {

	float pitch = vAudioData.w;
	if ( cos(vNormal.y*15.0 - vTime*4.0 + cos(vData.y*10.0 ) ) < 0.6 - pitch*3.0  ) {
		discard;
	}
	//gl_FragColor = vec4( vData.z, vData.w, 0.0, 1.0 );
	float alpha = pow( 1.0-abs(vNormal.y),2.0)+pitch*0.1;
	gl_FragColor = vec4(vColor.xyz, alpha);
}