import { GameScene } from "../scenes/GameScene";

export class Player extends Phaser.GameObjects.Container {
	public scene: GameScene;

	private sprite: Phaser.GameObjects.Sprite;
	private walkSpeed: number;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);

		this.sprite = this.scene.add.sprite(0, 0, "mouse", 0);
		this.sprite.setScale(0.5);
		this.add(this.sprite);

		this.setupAnimations();
		this.walkSpeed = 5;
	}

	update(time: number, delta: number) {
		let input = this.scene.getInputDirection();

		if (input.x == 0 && input.y == 0) {
			this.play('idle', true);
		}
		else {
			this.play('walk', true);

			if (input.x != 0) {
				this.scaleX = input.x;
			}
		}

		this.x += input.x * this.walkSpeed;
		this.y += input.y * this.walkSpeed;
	}

	play(key, ignoreIfPlaying=false) {
		this.sprite.play(key, ignoreIfPlaying);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'idle',
			frames: [
				{key: 'mouse', frame: 0, duration: 300},
				{key: 'mouse', frame: 1, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'walk',
			frames: [
				{key: 'mouse', frame: 2, duration: 100},
				{key: 'mouse', frame: 3, duration: 100},
			],
			repeat: -1
		});
	}
}