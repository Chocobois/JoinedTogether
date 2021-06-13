
import { GameScene } from "../scenes/GameScene";

export class Player extends Phaser.GameObjects.Container {
	public scene: GameScene;

	public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	public thoughtBubble: Phaser.GameObjects.Sprite;
	public mood: string;
	// private thoughtText: Phaser.GameObjects.Text;
	private walkSpeed: number;
	private prevFrame: string;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, 0, 0);
		this.scene = scene;
		this.scene.add.existing(this);

		this.sprite = scene.physics.add.sprite(x, y, "cat", 0);
		this.sprite.setScale(0.5);
		this.add(this.sprite);

		// this.sprite.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, 20, 20));
		// this.sprite.body.setSize(this.sprite.displayWidth, this.sprite.displayHeight);
		let size = 0.7*this.sprite.displayWidth
		this.sprite.body.setCircle(size, size/2, 0.8*size);
		// let rect = new Phaser.Types.Physics.Arcade.ArcadeBodyBounds();
		// console.log(this.sprite.body.getBounds);

		this.setupAnimations();
		this.walkSpeed = 400;
		this.prevFrame = "2";

		this.mood = "idle";


		this.thoughtBubble = this.scene.add.sprite(this.scene.CX, this.scene.CY - 40, "thought", 0);
		this.thoughtBubble.setScrollFactor(0, 0);
		this.thoughtBubble.setOrigin(0.5, 1);
		this.thoughtBubble.setScale(0.5);
		this.thoughtBubble.setVisible(true);
		this.thoughtBubble.play('thinking', true);
		// this.add(this.thoughtBubble);
		this.thoughtBubble.setDepth(6);
		this.scene.add.existing(this.thoughtBubble);

		// this.thoughtText = this.scene.createText(0, -116, 20, this.scene.weights.regular, "#000");
		// this.thoughtText.setOrigin(0.5);
		// this.thoughtText.setText("Sus is poggers...");
		// this.add(this.thoughtText);
	}

	update(time: number, delta: number) {
		let input = this.scene.getInputDirection();

		if ((input.x == 0 && input.y == 0) || this.isAsleep) {
			if (this.mood == "angry") {
				this.play("angry", true);
			}
			else if (this.mood == "sleeping") {
				this.play("sleeping", true);
			}
			else if (this.mood == "scared") {
				this.play("scared", true);
			}
			else {
				this.play("idle", true);
			}
		}
		else {
			this.play('walk', true);
			if (this.sprite.frame.name == "2" && this.prevFrame != this.sprite.frame.name) {
				let key = ["Char_Step_01", "Char_Step_02", "Char_Step_03", "Char_Step_04"][Math.floor(Math.random() * 4)];
				this.scene.audio.play(key);
			}
			this.prevFrame = this.sprite.frame.name;

			if (input.x != 0) {
				this.sprite.scaleX = 0.5 * (input.x > 0 ? 1 : -1);
			}
		}

		if (!this.isAsleep) {
			this.sprite.body.setVelocityX(this.walkSpeed * input.x);
			this.sprite.body.setVelocityY(this.walkSpeed * input.y);

			// this.thoughtBubble.x = this.sprite.x;
			// this.thoughtBubble.y = this.sprite.y-40;
		}
	}

	play(key, ignoreIfPlaying=false) {
		this.sprite.play(key, ignoreIfPlaying);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'idle',
			frames: [
				{key: 'cat', frame: 0, duration: 300},
				{key: 'cat', frame: 1, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'walk',
			frames: [
				{key: 'cat', frame: 3, duration: 100},
				{key: 'cat', frame: 2, duration: 100},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'angry',
			frames: [
				{key: 'cat', frame: 4, duration: 300},
				{key: 'cat', frame: 5, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'sleeping',
			frames: [
				{key: 'cat', frame: 6, duration: 300},
				{key: 'cat', frame: 7, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'thinking',
			frames: [
				{key: 'thought', frame: 0, duration: 300},
				{key: 'thought', frame: 1, duration: 300},
			],
			repeat: -1
		});
	}

	get isAsleep() {
		return this.mood == "sleeping";
	}
}