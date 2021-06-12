import { GameScene } from "../scenes/GameScene";

export class Monster extends Phaser.GameObjects.Container {
	public scene: GameScene;

	public sprite: Phaser.GameObjects.Sprite;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);

		this.sprite = this.scene.add.sprite(0, 0, "monster", 0);
		this.sprite.setScale(0.5);
		this.add(this.sprite);

		this.setupAnimations();
	}

	update(time: number, delta: number) {
	}

	play(key, ignoreIfPlaying=false) {
		this.sprite.play(key, ignoreIfPlaying);
	}

	setupAnimations() {
		this.scene.anims.create({
			key: 'monster_idle',
			frames: [
				{key: 'monster', frame: 0, duration: 300},
				{key: 'monster', frame: 1, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'monster_angry',
			frames: [
				{key: 'monster', frame: 3, duration: 100},
				{key: 'monster', frame: 2, duration: 100},
			],
			repeat: -1
		});
	}
}