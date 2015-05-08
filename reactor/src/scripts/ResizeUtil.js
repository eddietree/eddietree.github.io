var THREEx  = THREEx || {};
THREEx.WindowResize = function(renderer, camera){

  var callback = function(){

    // notify the renderer of the size change
    renderer.setSize( window.innerWidth, window.innerHeight );

    // update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', callback, false);
  return {
    stop  : function(){
      window.removeEventListener('resize', callback);
    }
  };
}