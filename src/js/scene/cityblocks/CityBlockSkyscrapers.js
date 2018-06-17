import CityBlock from 'scene/cityblocks/CityBlock';

export default class extends CityBlock {
	constructor(land, width, depth) {
		super(land);

		this.geometry = new THREE.CubeGeometry(0.75, 0.75, 0.75, 1, 1, 1);
		this.material = new THREE.MeshBasicMaterial({color: 0xff0000});
		this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.objectGroup.add(this.mesh);

		const w = land.scale * width;
		const d = land.scale * depth;

		this.objectGroup.scale.set(w, Math.max(w, d), d);
		this.objectGroup.translateX(w / 2 - width / 2 + land.x * width);
		this.objectGroup.translateY(-400);
		this.objectGroup.translateZ(d / 2 - depth / 2 + land.y * depth);

	}
}
