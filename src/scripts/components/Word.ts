import { GameScene } from "../scenes/GameScene";
import { Phrase } from "./Phrase";

export class Word extends Phaser.GameObjects.Text {
	public scene: GameScene;
	public phrase: Phrase;
	// public phrase: string;
	// public draggable: boolean;
	// public empty: boolean;
	public highlighted: boolean;

	constructor(scene: GameScene, config: Phaser.Types.GameObjects.Text.TextStyle) {
		super(scene, 0, 0, "", config);
		this.scene = scene;

		this.setOrigin(0, 0.5);
		this.setVisible(false);
		this.setScrollFactor(0, 0);
	}

	update(isDragging: boolean, selected: any, allowedDrop: boolean) {
		if (this.phrase && this.phrase.draggable) {
			if (this.phrase.empty) {
				this.setStroke("#FFAA00", 4);
				// if (/*isDragging &&*/(allowedDrop || this.phrase.type == selected.phrase.type || !this.phrase.type || !selected.phrase.type)) {
				if (allowedDrop) {
					this.setText("_____");
				}
				else {
					this.setText("");
				}
			}
			else {
				this.setStroke("#FF7700", 4);
				this.setText(this.phrase.text);
			}
		}

		// const k = 1;
		// this.input.hitArea.setTo(-k, -k, this.width+2*k, this.height+2*k);
	}

	onDropzone() {
		this.setStroke("#00FF00", 4);
	}

	getPhrase(): Phrase {
		return this.phrase;
		// return {
			// text: this.phrase,
			// draggable: this.draggable,
			// empty: this.empty,
		// };
	}

	setPhrase(phrase: Phrase) {
		this.phrase = phrase;
		this.setText(this.phrase.text);

		if (this.input) {
			this.input.enabled = this.phrase.draggable;
		}

		this.setEmpty(phrase.empty);
	}

	setEmpty(value: boolean) {
		this.phrase.empty = value;
	}

	get draggable() {
		return this.phrase.draggable;
	}

	get empty() {
		return this.phrase.empty;
	}

	// get type() {
		// return this.phrase.type;
	// }
}