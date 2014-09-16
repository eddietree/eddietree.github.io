function resize()
{
     if(window.innerWidth != currentWindowWidth){
     	renderer.resize(window.innerWidth-3, window.innerHeight-3);

        //renderer.view.style.width = window.innerWidth + "px";
		//renderer.view.style.height = window.innerHeight + "px";
        currentWindowWidth = window.innerWidth-3;
     }
}

var currentWindowWidth = 0;

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0xFFACA1);

// create a renderer instance
var renderer = new PIXI.WebGLRenderer(1, 1);//autoDetectRenderer(400, 300);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

requestAnimFrame( animate );

// create a texture from an image path
var texture = PIXI.Texture.fromImage("img/Body01.png");
// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprites anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite t the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

function animate() {

    requestAnimFrame( animate );
    resize();

    bunny.position.x = window.innerWidth*0.5;
    bunny.position.y = window.innerHeight*0.5;

    // just for fun, lets rotate mr rabbit a little
    bunny.rotation += 0.01;
    bunny.scale.x = 0.5;
    bunny.scale.y = 0.5;

    // render the stage
    renderer.render(stage);
}
