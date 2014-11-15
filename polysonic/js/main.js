function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var scene;
var camera;
var renderer;
var g_objs;
var g_profiles;
var g_audioManager;
var g_dt = 1.0 / 60.0;
var g_time = 0.0;
var g_shader_files;
var g_soundcloud;

function main( err, files ) {
  
  if (err) {
      throw err;
    }

  g_shaderFiles = files;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  console.log(camera.position.x, camera.position.y, camera.position.z);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 1);
  document.body.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );

  // objs
  g_objs = new ObjManager();
  g_objs.init();

  if ( Settings.UseSoundCloud ) {
  	g_soundcloud = new SoundCloudManager();
  	g_soundcloud.init();
  } else {
     // audio manager
    g_audioManager = new AudioManager();
    g_audioManager.init();
  }

  // profile
  g_profiles = new ProfileManager();
  g_profiles.init();
  g_profiles.loadProfile( 0 );

  // show stats
  if ( Settings.ShowFPS ) {
    var stats = new Stats();
    stats.setMode(1); // 0: fps, 1: ms

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
  }

  (function animloop(){

    if ( stats ) stats.begin();
    if ( g_audioManager ) g_audioManager.update();
    if ( g_soundcloud ) g_soundcloud.update();

    render();
    g_time += g_dt;

    if ( stats ) stats.end();

    requestAnimationFrame(animloop);
  })();
}

function render()
{
  renderer.render( scene, camera );

  if ( g_soundcloud ) {
     g_soundcloud.draw();
  }

  g_objs.update();
  g_objs.draw();
}

function getShader( shaderName )
{
  return "shaders/" + shaderName;
}

loadFiles([
    "shaders/basic.vp", "shaders/basic.fp",
    "shaders/fish.vp", "shaders/fish.fp",
    "shaders/core.vp", "shaders/core.fp",
    "shaders/particles.vp", "shaders/particles.fp",
    "shaders/lines.vp", "shaders/lines.fp",
    "shaders/waves.vp", "shaders/waves.fp",
  ], main);