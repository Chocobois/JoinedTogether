export class Flower extends Phaser.GameObjects.Image {
	constructor(scene: Phaser.Scene, x: number, y: number, key: string, frame: number) {
		super(scene, x, y, key, frame);
		scene.add.existing(this);

		this.setScale(0.5);
		this.setFrame(frame);
		this.setTint(0xAACCFF);
	}
}