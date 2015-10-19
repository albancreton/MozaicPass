/**
 * @author alban creton / http://alban.me/
 *
 */

THREE.MozaicPass = function( cellsize ) {
	console.info( "THREE.MozaicPass!!!" );
	if ( THREE.MozaicShader === undefined ) console.error( "THREE.MozaicPass relies on THREE.MozaicShader" );

	var shader = THREE.MozaicShader;
	this.textureID = "tDiffuse";

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.cellsize = cellsize || 100;

	this.material = new THREE.ShaderMaterial( {

		defines: shader.defines || {},
		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	this.renderToScreen = false;

	this.enabled = true;
	this.needsSwap = true;
	this.clear = false;


	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene  = new THREE.Scene();

	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.scene.add( this.quad );
}

THREE.MozaicPass.prototype = {

	updateAmount: function(renderer) {
		this.cellsize = Math.round(this.cellsize);

		if(this.cellsize < 1){
			this.cellsize = 1;
		}

		this.uniforms['amount'].value.x = Math.round(renderer.getSize().width / this.cellsize);
		this.uniforms['amount'].value.y = renderer.getSize().height / renderer.getSize().width * this.uniforms['amount'].value.x;
	},

	render: function ( renderer, writeBuffer, readBuffer, delta ) {
		this.updateAmount(renderer);

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer;

		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

};
