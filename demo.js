
function createCubeDemo(element, have_gui) {

  // Init scene, camera, renderer and a cube
  var scene, camera, renderer, cube;

  (function(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( element.offsetWidth, element.offsetHeight );
    renderer.setClearColor( 0xeeeeee, 1 );
    element.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var material = new THREE.MeshPhongMaterial( { color: 0x666666, specular: 0xdddddd, shininess: 30, shading: THREE.FlatShading } )
    cube = new THREE.Mesh( geometry, material );

    scene.add( cube );
  })();

  // add some lights
  (function(){
    var position = 0, lights = 15;

    for(var j=0; j<=lights; j++) {
      var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );

      directionalLight.position.x = 0;
      directionalLight.position.y = Math.cos(position) * 5;
      directionalLight.position.z = Math.sin(position) * 5;


      directionalLight.position.normalize();

      scene.add( directionalLight );
      position += (Math.PI*16)/lights
    }
  })();


  // init the effect composer and some effect
  var composer, vignettage, revignettage;
  // and our pass
  var mozaic;

  (function(){
    var copy;

    composer = new THREE.EffectComposer( renderer );

    vignettage = new THREE.ShaderPass( THREE.VignetteShader );
    revignettage = new THREE.ShaderPass( THREE.VignetteShader );
    copy = new THREE.ShaderPass(THREE.CopyShader)
    copy.renderToScreen = true

    mozaic = new THREE.MozaicPass();    // HERE

    composer.addPass( new THREE.RenderPass( scene, camera ) );
    composer.addPass( vignettage )
    composer.addPass( mozaic )        // HERE
    composer.addPass( revignettage )
    composer.addPass( copy )
  })();

  // some controls for the demo
  if(have_gui) {
    (function(){
      var gui = new dat.GUI({
          height : 2 * 32 - 1,
          autoplace: false
      });
      var f1 = gui.addFolder('Mozaic effect');
      f1.add(mozaic, 'cellsize').min(1).max(50).step(1).listen();
      f1.open();

      element.appendChild(gui.domElement);
    })();
  }


  // utils random functions
  function randz(n){
    return -n + Math.random()*n*2
  }

  function randr(min, max) {
    return min + Math.random()*(max-min)
  }

  // randomly rotate the cube
  function move_cube() {
    var s = randr(.5,2), tween1, tween2;

    tween1 = new TWEEN.Tween(cube.rotation)
    .easing(EASE_FUNCTION)
    tween1.to( {
      x: randr(-Math.PI, Math.PI),
      z: randr(-Math.PI, Math.PI)
    }, EASE_TIME )
    tween1.onComplete(function(){
      setTimeout(move_cube, 500 + Math.random()*500);
    })
    tween1.start()

    tween2 = new TWEEN.Tween(cube.scale)
    .easing(EASE_FUNCTION)
    tween2.to( {
      x: s,
      y: s,
      z: s
    }, EASE_TIME )
    tween2.start()
  }

  // randomly pixalate the scene
  function automozaic () {
    var r = randr(1,50), tween1, tween2;

    tween1 = new TWEEN.Tween(mozaic)
    tween1.to ({
      cellsize: r
    }, EASE_TIME/3)
    tween1.onComplete( function(){
      setTimeout(automozaic, 1500 + Math.random()*1500);
    })
    tween1.start()

    tween2 = new TWEEN.Tween(revignettage.uniforms[ 'darkness' ])
    tween2.to({
      value: r/10/4
    }, EASE_TIME/3)
    tween2.start()
  }

  // render the thing
  function render (time) {
    requestAnimationFrame( render );

    cube.rotation.y += .01;

    TWEEN.update(time)
    renderer.render(scene, camera);
    composer.render(time);
  };


  move_cube();
  automozaic();
  render();
}