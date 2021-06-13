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

	update(isDragging: boolean, selected: any, isThought: boolean) {
		if (this.phrase) {
			if (this.phrase.draggable) {
				if (this.phrase.empty) {
					this.setStroke("#FFAA00", 4);
					if (isDragging && (isThought || this.phrase.type == selected.phrase.type || !this.phrase.type || !selected.phrase.type)) {
						this.setText("______");
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
		}
		// if (this.phrase)
		// 	if (this.phrase.type)
		// 		this.setText('<'+this.phrase.type!+','+this.phrase.empty+'>');
		// 	else
		// 		this.setText('word');
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