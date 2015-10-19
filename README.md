# MozaicPass
Mozaic (pixalate) Shader and Pass for Three.js

##

Include the Shader and the Pass

```html
<script type="text/javascript" src="lib/MozaicShader.js"></script>
<script type="text/javascript" src="lib/MozaicPass.js"></script>
```

Add Mozaic Pass to your effect composer stack

```javascript
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xeeeeee, 1 );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshBasicMaterial( { color: 0x666666 } );;

scene.add( cube );


var composer = new THREE.EffectComposer( renderer );

var mozaic = new THREE.MozaicPass();
mozaic.cellsize = 20;
mozaic.renderToScreen = true;

composer.addPass( mozaic );

function render() {
  requestAnimationFrame( render );

  cube.rotation.y += .01;

  renderer.render(scene, camera);
  composer.render(time);
}
```

demo: http://albancreton.github.io/MozaicPass/