import { GameScene } from "../scenes/GameScene";

export class Monster extends Phaser.GameObjects.Container {
	public scene: GameScene;
	public sprite: Phaser.GameObjects.Sprite;
	public mood: string;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);

		this.sprite = this.scene.add.sprite(0, 0, "monster", 0);
		this.sprite.setScale(0.5);
		this.sprite.setTint(0xb7adc7);
		this.add(this.sprite);

		this.mood = "idle";

		this.setupAnimations();
	}

	update(time: number, delta: number) {
		if (this.mood == "dead") {
			this.play('monster_dead', true);
		}
		else {
			if (this.mood == "angry") {
				this.play('monster_angry', true);
			}
			else if (this.mood == "sleeping") {
				this.play('monster_sleeping', true);
			}
			else if (this.mood == "scared") {
				this.play('monster_scared', true);
			}
			else {
				this.play('monster_idle', true);
			}
		}
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
			key: 'monster_sleeping',
			frames: [
				{key: 'monster', frame: 2, duration: 300},
				{key: 'monster', frame: 3, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'monster_angry',
			frames: [
				{key: 'monster', frame: 4, duration: 300},
				{key: 'monster', frame: 5, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'monster_scared',
			frames: [
				{key: 'monster', frame: 6, duration: 300},
				{key: 'monster', frame: 7, duration: 300},
			],
			repeat: -1
		});

		this.scene.anims.create({
			key: 'monster_dead',
			frames: [
				{key: 'monster', frame: 8, duration: 0},
			],
			repeat: -1
		});
	}
}