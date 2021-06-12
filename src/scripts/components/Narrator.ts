import { GameScene } from "../scenes/GameScene";
import { Phrase, phraseData, areaData } from "./Phrase";
import { Word } from "./Word";
import { DragWord } from "./DragWord";

export class Narrator extends Phaser.GameObjects.Container {
	public scene: GameScene;

	private cX: number;
	private cY: number;
	private words: Word[];
	public thoughtWord: Word;
	public dragWord: DragWord;
	private selected?: Word;
	private dropzone?: Word;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, 0, 0);
		this.cX = x;
		this.cY = y;
		this.scene = scene;
		this.scene.add.existing(this);

		// Create Words
		this.words = [];
		for (let i = 0; i < 10; i++) {
			let word = this.createWord();
			this.add(word);
			this.words.push(word);
		}

		// Create thought word
		this.thoughtWord = this.createWord();
		this.thoughtWord.setPhrase(phraseData["empty"]);
		this.thoughtWord.setVisible(true);
		this.thoughtWord.setScale(0.7);
		this.scene.add.existing(this.thoughtWord);

		// Create interactive word
		this.dragWord = new DragWord(this.scene, {
			fontFamily: "LatoRegular",
			fontSize: "30px",
			color: "#000"
		});
		this.makeDraggable();
		this.scene.add.existing(this.dragWord);


		// this.setPhrases([
			// { text: "A cat is in a dungeon", draggable: false, empty: false },
			// { text: "and he's smelly", draggable: true, empty: false },
		// ]);
	}

	update(time: number, delta: number) {
		this.dropzone = undefined;
		this.words.forEach((word: Word) => {
			word.update(time, delta);
			this.checkOverlap(word);
		});
		this.thoughtWord.update(time, delta);
		this.checkOverlap(this.thoughtWord);
		this.dragWord.update(time, delta);

		this.thoughtWord.x = this.scene.CX - this.thoughtWord.displayWidth/2;
		this.thoughtWord.y = this.scene.CY - 115;

		let showThought = (!this.thoughtWord.empty || this.dragWord.drag);
		this.thoughtWord.setVisible(showThought);
		this.scene.player.thoughtBubble.setVisible(showThought);
	}


	createWord() {
		let word = new Word(this.scene, {
			fontFamily: "LatoRegular",
			fontSize: "30px",
			color: "#000"
		});
		this.makeSelectable(word);
		return word;
	}

	resetText() {
		this.words.forEach((word: Word) => {
			word.setVisible(false);
		});
	}

	setPhrases(phrases: Phrase[]) {
		this.resetText();

		for (let i = 0; i < phrases.length; i++) {
			this.words[i].setPhrase(phrases[i]);
			this.words[i].setVisible(true);
		}

		this.repositionText();
	}

	repositionText() {
		let totalWidth = 0;
		let spacing = 10;

		for (let word of this.words) {
			if (word.visible) {
				word.setPosition(this.cX + totalWidth, this.cY);
				totalWidth += word.width + spacing;
			}
		}
		totalWidth -= spacing;

		for (let word of this.words) {
			word.x -= totalWidth/2;
		}
	}

	makeSelectable(word: Word) {
		word.setInteractive({ useHandCursor: true });

		word.on("pointerover", (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
			if (!this.selected && !word.empty) {
				this.dragWord.x = word.x;
				this.dragWord.y = word.y;
				this.dragWord.setScale(word.scaleX);
				this.dragWord.setText(word.phrase.text);
				this.dragWord.setVisible(true);

				this.selected = word;
				this.selected.setVisible(false);
			}
		});
	}

	checkOverlap(word) {
		if (word.getPhrase()) {
			word.setEmpty(word.empty);
			if (word.draggable && word.empty && this.dragWord.drag && this.selected) {
				if (Phaser.Geom.Rectangle.Contains(word.input.hitArea, this.scene.input.x-word.x, this.scene.input.y-word.y+word.displayHeight/2)) {
					this.dropzone = word;
					word.setStroke("#00FF00", 4);
				}
			}
		}
	}

	makeDraggable() {
		this.dragWord.setInteractive({ useHandCursor: true, draggable: true });
		const distance = 20;

		this.dragWord.on("pointerdown", () => {
			this.dragWord.lock = true;
		});
		this.dragWord.on("pointerout", () => {
			this.dragWord.lock = false;
			this.onDragEnd();
		});
		this.dragWord.on("pointerup", () => {
			this.dragWord.lock = false;
		});
		this.dragWord.on("dragstart", (pointer, dragX, dragY) => {
			this.dragWord.dragOffsetX = this.x;
			this.dragWord.dragOffsetY = this.y;
			this.dragWord.dragX = pointer.x;
			this.dragWord.dragY = pointer.y;
		});
		this.dragWord.on("drag", (pointer, dragX, dragY) => {
			if (this.dragWord.lock && (Math.abs(pointer.x - this.dragWord.dragX) > distance || Math.abs(pointer.y - this.dragWord.dragY) > distance)) {
				this.onDragStart();
			}
			this.dragWord.goalX = dragX + this.dragWord.dragOffsetX;
			this.dragWord.goalY = dragY + this.dragWord.dragOffsetY;
		});
		this.dragWord.on("dragend", (pointer, dragX, dragY, dropped) => {
			this.onDragEnd();
		});
	}

	onDragStart() {
		this.dragWord.drag = true;
		this.dragWord.lock = false;
		if (this.selected) {
			this.selected.setVisible(true);
			this.selected.setEmpty(true);
			this.repositionText();
		}
	}

	onDragEnd() {
		this.dragWord.setVisible(false);
		this.dragWord.drag = false;

		if (this.selected) {
			if (this.dropzone) {
				let phrase = this.selected.getPhrase();
				this.selected.setPhrase(this.dropzone.getPhrase());
				this.dropzone.setPhrase(phrase);
				this.dropzone.setEmpty(false);
			}
			else {
				this.selected.setVisible(true);
				this.selected.setEmpty(false);
			}
			this.selected = undefined;
			this.repositionText();
		}
	}
}