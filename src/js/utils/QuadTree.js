export default class QuadTree {
	constructor() {
		this.children = null;
		this.setRoot();
	}

	fillRandomly(maxDepth, randomizer = QuadTree._randomizer) {
		this._fillRandomlyRec(maxDepth, this.parent, randomizer);
	}

	isRoot() {
		return this.parent === null;
	}

	isLeaf() {
		return this.children === null;
	}

	addChild(child, index = 0) {
		if (this.isLeaf()) {
			this.children = [];
		}
		this.children[index] = child;
		if (child !== null) {
			child.setParent(this, index);
		}
	}

	setParent(parent, index = 0) {
		if (parent === null) {
			this.setRoot();
		} else {
			this.parent = parent;
			this.index = index;
		}
		this._updateChildrenRec();
	}

	setRoot() {
		this.parent = null;
		this.index = 0;
		this.depth = 0;
		this.scale = 1;
		this.x = 0;
		this.y = 0;
	}

	//======================================================

	_fillRandomlyRec(maxDepth, parent, randomizer) {
		if (this.depth >= maxDepth) {
			return;
		}

		for (let i = 0; i < 4; i++) {
			if (randomizer()) {
				let qt = new QuadTree();
				this.addChild(qt, i);
				qt._fillRandomlyRec(maxDepth, this, randomizer);
			} else {
				this.addChild(null, i);
			}
		}
		if (this.children.every((c) => c === null)) {
			this.children = null;
		}
	}

	_updateChildrenRec() {
		if (!this.isRoot()) {
			this.depth = this.parent.depth + 1;
			this.scale = this.parent.scale / 2;
			this.x = this.parent.x + (+(this.index % 2 === 1)) * this.scale;
			this.y = this.parent.y + (+(this.index >= 2)) * this.scale;
		}
		if (!this.isLeaf()) {
			this.children.forEach((child, idx) => {
				child._updateChildrenRec(idx);
			})
		}
	}

	static _randomizer() {
		return Math.random() < 0.75;
	}
}
