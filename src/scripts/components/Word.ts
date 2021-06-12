import { GameScene } from "../scenes/GameScene";
import { Phrase } from "./Phrase";

export class Word extends Phaser.GameObjects.Text {
	public scene: GameScene;
	public phrase: string;
	public draggable: boolean;
	public empty: boolean;

	constructor(scene: GameScene, config: Phaser.Types.GameObjects.Text.TextStyle) {
		super(scene, 0, 0, "", config);
		this.scene = scene;

		this.setOrigin(0, 0.5);
		this.setVisible(false);
	}

	update(time: number, delta: number) {
	}

	getPhrase(): Phrase {
		return {
			text: this.phrase,
			draggable: this.draggable,
			empty: this.empty,
		};
	}

	setPhrase(phrase: Phrase) {
		this.phrase = phrase.text;
		this.setText(this.phrase);

		this.draggable = phrase.draggable;
		if (this.input) {
			this.input.enabled = this.draggable;
		}

		this.setEmpty(phrase.empty);
	}

	setEmpty(value: boolean) {
		this.empty = value;

		if (this.draggable) {
			if (this.empty) {
				this.setStroke("#FFAA00", 4);
				this.setText("______");
			}
			else {
				this.setStroke("#FF7700", 4);
				this.setText(this.phrase);
			}
		}
	}
}