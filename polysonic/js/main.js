function onWindowResize(){
  var width = window.innerWidth;
  var height = window.innerHeight;

  camera.aspect = width / height;

  if ( Settings.VRMode ) {
    camera.aspect *= 2.0;
  }

  camera.updateProjectionMatrix();
  renderer.setSize( width, height );
  
  if ( effect ) { 
    effect.setSize(width, height);
  }
}

function setOrientationControls(e) {
  if (!e.alpha) {
    return;
  }

  if ( controls ) {
    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();
  }

  element.addEventListener('click', fullscreen, false);
  window.removeEventListener('deviceorientation', setOrientationControls);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
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
var element;
var effect;
var controls;

function main( err, files ) {
  
  if (err) {
      throw err;
    }

  g_shaderFiles = files;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 1);
  element = renderer.domElement;
  document.body.appendChild( element );

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  
  window.addEventListener( 'deviceorientation', setOrientationControls, true );
  window.addEventListener( 'resize', onWindowResize, false );

  // VR?
  var useVR = getQueryVariable("vr");
  if ( useVR ) {
    Settings.VRMode = (useVR == 1) || useVR == "true";  
  }

  if ( Settings.VRMode ) {
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    scene.add(camera);

    effect = new THREE.StereoEffect(renderer);
    
    controls = new THREE.OrbitControls(camera, element);
    //controls.rotateUp(Math.PI / 4);
    controls.target.set(0,0,0);
    controls.noZoom = true;
    controls.noPan = true;
  }

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
    if ( controls ) controls.update();

    render();
    g_time += g_dt;

    if ( stats ) stats.end();

    requestAnimationFrame(animloop);
  })();

  onWindowResize();
}

function fullscreen() {
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  }
}

function render()
{
  if ( effect ) {
    effect.render(scene, camera);
  } else {
    renderer.render( scene, camera );
  }

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