import { GameScene } from "../scenes/GameScene";
import { Phrase, phraseData, areaData } from "./Phrase";
import { Word } from "./Word";
import { DragWord } from "./DragWord";

export class Narrator extends Phaser.GameObjects.Container {
	public scene: GameScene;

	private cX: number;
	private cY: number;
	public bg: Phaser.GameObjects.Image;
	private words: Word[];
	public thoughtWord: Word;
	public dragWord: DragWord;
	private selected?: Word;
	private dropzone?: Word;
	private fontConfig: any;
	private thoughtAlpha: number;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, 0, 0);
		this.cX = x;
		this.cY = y;
		this.scene = scene;
		this.scene.add.existing(this);

		// Font
		this.fontConfig = {
			fontFamily: "Suplexmentary",
			fontSize: "28px",
			color: "#FFF"
		};

		// Background
		this.bg = this.scene.add.image(this.cX, this.cY, "text_bg");
		this.bg.setScrollFactor(0, 0);
		this.add(this.bg);

		// Create Words
		this.words = [];
		for (let i = 0; i < 10; i++) {
			let word = this.createWord();
			this.add(word);
			this.words.push(word);
		}

		// Create thought word
		this.thoughtWord = this.createWord();
		this.thoughtWord.setPhrase(phraseData["player"]);
		this.thoughtWord.setVisible(true);
		this.thoughtWord.setScale(0.7);
		this.thoughtWord.setDepth(100);
		this.scene.add.existing(this.thoughtWord);

		this.thoughtAlpha = 0;

		// Create interactive word
		this.dragWord = new DragWord(this.scene, this.fontConfig);
		this.makeDraggable();
		this.dragWord.setDepth(100);
		this.scene.add.existing(this.dragWord);


		// this.setPhrases([
			// { text: "A cat is in a dungeon", draggable: false, empty: false },
			// { text: "and he's smelly", draggable: true, empty: false },
		// ]);
	}

	update(time: number, delta: number) {
		let thoughtType: string | undefined = undefined;
		if (!this.thoughtWord.empty || this.dragWord.drag) {
			thoughtType = this.thoughtWord.phrase.type;
		}

		this.checkPointerOver();

		this.dropzone = undefined;
		this.words.forEach((word: Word) => {
			if (word.phrase) {
				// console.log(word.type, thoughtType);
				word.update(this.dragWord.drag, this.selected, thoughtType == word.phrase.type);
				this.checkOverlap(word);
			}
		});
		this.thoughtWord.update(this.dragWord.drag, this.selected, true);
		this.checkOverlap(this.thoughtWord);
		this.dragWord.update();

		this.repositionText();

		this.thoughtWord.x = this.scene.CX - this.thoughtWord.displayWidth/2;
		this.thoughtWord.y = this.scene.CY - 117;

		let showThought = (!this.thoughtWord.empty || this.dragWord.drag);
		if (showThought && this.thoughtAlpha < 1) {
			this.thoughtAlpha += 0.1;
		}
		if (!showThought && this.thoughtAlpha > 0) {
			this.thoughtAlpha -= 0.1;
		}
		this.thoughtWord.setAlpha(this.thoughtAlpha);
		this.scene.player.thoughtBubble.setAlpha(this.thoughtAlpha);
	}


	createWord() {
		let word = new Word(this.scene, this.fontConfig);
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
		let spacing = 6;

		for (let word of this.words) {
			if (word.visible) {
				word.setPosition(this.cX + totalWidth, this.cY);
				if (word.text != "") {
					totalWidth += word.width + spacing;
				}
			}
		}
		totalWidth -= spacing;

		for (let word of this.words) {
			word.x -= totalWidth/2;
		}

		if (this.selected && !this.dragWord.drag) {
			this.dragWord.x = this.selected.x;
			this.dragWord.y = this.selected.y;
		}

		this.bg.scaleX = (80 + totalWidth) / this.bg.width;
	}

	checkPointerOver() {
		let anyFound = false;
		for (let word of this.words) {
			if (word.input.enabled && Phaser.Geom.Rectangle.Contains(word.input.hitArea, this.scene.input.x-word.x, this.scene.input.y-word.y+word.displayHeight/2)) {
				this.pointerOver(word);
				anyFound = true;
			}
		}
		if (this.thoughtWord.input.enabled && Phaser.Geom.Rectangle.Contains(this.thoughtWord.input.hitArea, this.scene.input.x-this.thoughtWord.x, this.scene.input.y-this.thoughtWord.y+this.thoughtWord.displayHeight/2)) {
			this.pointerOver(this.thoughtWord);
			anyFound = true;
		}
		if (!anyFound && !this.dragWord.drag) {
			this.onDragEnd();
		}
	}

	pointerOver(word: Word) {
		console.log("PointerOver", word.text);
		if (!this.selected && !word.empty) {
			this.dragWord.x = word.x;
			this.dragWord.y = word.y;
			this.dragWord.setScale(word.scaleX);
			this.dragWord.setText(word.phrase.text);
			this.dragWord.setVisible(true);

			this.selected = word;
		}
	}

	makeSelectable(word: Word) {
		word.setInteractive({ useHandCursor: true, draggable: true });
		// this.scene.input.enableDebug(word);

		// word.on("pointerover", (pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData) => {
		// 	console.log("word", "pointerover");
		// 	if (!this.selected && !word.empty) {
		// 		this.dragWord.x = word.x;
		// 		this.dragWord.y = word.y;
		// 		this.dragWord.setScale(word.scaleX);
		// 		this.dragWord.setText(word.phrase.text);
		// 		this.dragWord.setVisible(true);

		// 		this.selected = word;
		// 	}
		// });

		const distance = 20;
		word.on("dragstart", (pointer, dragX, dragY) => {
			this.dragWord.lock = true;
			this.dragWord.dragOffsetX = this.x;
			this.dragWord.dragOffsetY = this.y;
			this.dragWord.dragX = pointer.x;
			this.dragWord.dragY = pointer.y;
		});
		word.on("drag", (pointer, dragX, dragY) => {
			if (this.dragWord.lock && (Math.abs(pointer.x - this.dragWord.dragX) > distance || Math.abs(pointer.y - this.dragWord.dragY) > distance)) {
				this.onDragStart();
			}
			this.dragWord.goalX = dragX + this.dragWord.dragOffsetX;
			this.dragWord.goalY = dragY + this.dragWord.dragOffsetY;
		});
		word.on("dragend", () => {
			this.onDragEnd();
		});
	}

	checkOverlap(word) {
		if (word.getPhrase()) {
			word.setEmpty(word.empty);
			if (word.draggable && word.empty && this.dragWord.drag && this.selected) {
				if (Phaser.Geom.Rectangle.Contains(word.input.hitArea, this.scene.input.x-word.x, this.scene.input.y-word.y+word.displayHeight/2)) {
					this.dropzone = word;
					word.onDropzone();
				}
			}
		}
	}

	makeDraggable() {
		// this.dragWord.setInteractive({ useHandCursor: true, draggable: true });
		// const distance = 20;

		/*
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
		*/
		/*
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
		this.dragWord.on("dragend", () => {
			this.onDragEnd();
		});
		*/
	}

	onDragStart() {
		this.dragWord.drag = true;
		this.dragWord.lock = false;
		if (this.selected) {
			this.selected.setVisible(true);
			this.selected.setEmpty(true);
			this.repositionText();
		}
		this.scene.audio.play("UI_PickUp");
	}

	onDragEnd() {
		this.dragWord.setVisible(false);
		this.dragWord.drag = false;

		if (this.selected) {
			if (this.dropzone) {
				// let phrase = this.selected.getPhrase();
				// this.selected.setPhrase(this.dropzone.getPhrase());
				// this.dropzone.setPhrase(phrase);
				this.swapPhrases(this.selected.phrase, this.dropzone.phrase);
				if (this.dropzone == this.thoughtWord) {
					this.selected.phrase.type = this.dropzone.phrase.type;
				}
				this.dropzone.setEmpty(false);
				this.scene.audio.play("UI_PutDown");
			}
			else {
				this.selected.setVisible(true);
				this.selected.setEmpty(false);
			}
			this.selected = undefined;
			this.repositionText();
		}
	}

	swapPhrases(a: Phrase, b: Phrase) {
		for (let prop of ["text", "audio", "draggable", "empty", "trigger", "type"]) {
			let temp = a[prop];
			a[prop] = b[prop];
			b[prop] = temp;
		}
	}
}