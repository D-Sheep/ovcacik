import * as Helpers from 'utils/Helpers';
import QuadTree from 'utils/QuadTree';
import CityBlockFactory from 'scene/CityBlockFactory';

export default class CityLayout {
	constructor(scene) {
		this.scene = scene;
		this.block = new QuadTree();
		this.width = 1000;
		this.depth = 1000;

		while (this.block.isLeaf()) {
			this.block.fillRandomly(4);
		}

		this.buildBlock(this.block, 0, 0);
	}

	buildBlock(block) {
		if (!block.isLeaf()) {
			block.children.forEach((childBlock, idx) => {
				if (childBlock !== null) {
					this.buildBlock(childBlock);
				}
			});
		} else {
			const scale = this.width * scale;
			let cityBlock = CityBlockFactory.createRandom(block, this.width, this.depth);

			this.scene.add(cityBlock.objectGroup);
		}
	}
}
