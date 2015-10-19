# MozaicPass
Mozaic (pixalate) Shader and Pass for Three.js

## How to ?

Include the Shader and the Pass

```html
<script type="text/javascript" src="lib/MozaicShader.js"></script>
<script type="text/javascript" src="lib/MozaicPass.js"></script>
```

Add Mozaic Pass to your effect composer stack

```javascript
var composer = new THREE.EffectComposer( renderer );

var mozaic = new THREE.MozaicPass();
mozaic.cellsize = 20;
mozaic.renderToScreen = true;

composer.addPass( mozaic );

```

demo: http://albancreton.github.io/MozaicPass/
