import { BaseScene } from "./BaseScene";

export class GameScene extends BaseScene {
	constructor() {
		super({key: 'GameScene'});
	}

	create(): void {
		this.cameras.main.setBackgroundColor(0xFFFFFF);
		this.fade(false, 200, 0x000000);

		let bg = this.add.image(this.CX, this.CY, 'background');
		this.containToScreen(bg);

		let player = this.add.image(0.3*this.W, this.CY, 'player');
		player.setScale(0.5);
	}

	update(time: number, deltaMs: number): void {
	}
}