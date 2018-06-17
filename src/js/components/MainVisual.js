import CityLayout from 'scene/CityLayout';

export default class MainVisual {
	constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		this.renderer = new THREE.WebGLRenderer();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		var geometry = new THREE.BoxGeometry( 100, 100, 100 );
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
		this.cube = new THREE.Mesh( geometry, material );
		this.scene.add(this.cube);

		this.camera.position.z = 1500;
		this.camera.position.y = 10;

		this.cityLayout = new CityLayout(this.scene);

		this.boundRender = this.render.bind(this);
		this.boundRender();

		$(document).on('keydown', (e) => {
			switch (e.keyCode) {
				case 38: //Up
					this.camera.position.z -= 10;
					break;
				case 40: //Down
					this.camera.position.z += 10;
					break;
				case 37: //Left
					this.camera.position.x -= 10;
					break;
				case 39: //Right
					this.camera.position.x += 10;
					break;
			}
		});
	}

	render() {
		//this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.02;
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.boundRender);
	}
}
