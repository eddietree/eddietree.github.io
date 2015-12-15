uniform vec3 uColorSky;
uniform vec3 uColorSnow;

uniform sampler2D uTex;
varying float vTime;
varying vec3 vPosWorld;
varying float vDistToCamera;

void main() {

  vec4 texColor = texture2D(uTex, gl_PointCoord);
  float fogCoeff = clamp(vDistToCamera*0.003,0.0,1.0);
  texColor.xyz = mix( texColor.xyz * uColorSnow, uColorSky, fogCoeff );

  gl_FragColor = texColor;//vec4(gl_PointCoord, 0.0, 1.0);
}