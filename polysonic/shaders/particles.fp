precision highp float;
precision mediump int;

varying vec3 vPosition;
varying float vDistance;
//varying vec4 vColor;

void main() {
    vec2 uv = gl_PointCoord.xy;
    float distFromCenter = length( uv*2.0 - vec2(1.0) );
    float alpha = smoothstep(0.0, abs(vDistance), 1.0-distFromCenter) * (1.0-smoothstep(0.0,1.0, vDistance*0.5));

    gl_FragColor = vec4(1.0,1.0,1.0,alpha);
}