/**
 * @author alban creton / http://alban.me/
 *
 */

THREE.MozaicShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"amount":   { type: "v2", value: new THREE.Vector2( 300., 200. ) }

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform vec2 amount;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main() {",
			"vec2 uv = floor(vUv*amount)/amount;",

			"gl_FragColor = texture2D( tDiffuse, uv );",

		"}"

	].join( "\n" )

};