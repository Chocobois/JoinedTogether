import { BaseScene } from "./BaseScene";
import { Player } from "../components/Player";

export class GameScene extends BaseScene {
	private player: Player;
	private keys: any;

	constructor() {
		super({key: "GameScene"});
	}

	create(): void {
		// Note: "fade", "CX", "CY", "containToScreen" is found in BaseScene

		// Background color and fading animation
		this.cameras.main.setBackgroundColor(0xFFFFFF);
		this.fade(false, 200, 0x000000);


		/* Background */

		let bg = this.add.image(this.CX, this.CY, "background");
		bg.setAlpha(0.2);
		this.containToScreen(bg);


		/* Player*/

		this.player = new Player(this, 0.3*this.W, this.CY);


		/* Input */

		this.setupInput();
	}

	update(time: number, deltaMs: number): void {
		this.player.update(time, deltaMs);
	}


	setupInput() {
		// if (!this._listeners) {
			// this._listeners = true;
		// }

		this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
			.on('down', this.onTapDown, this)
			.on('up', this.onTapUp, this);
		this.input.on('pointerdown', this.onTapDown, this);
		this.input.on('pointerup', this.onTapUp, this);

		this.keys = this.input.keyboard.addKeys({
			up: 'up',
			down: 'down',
			left: 'left',
			right: 'right',
			W: 'W',
			S: 'S',
			A: 'A',
			D: 'D'
		});
	}

	get left() {
		return (this.keys.left.isDown || this.keys.A.isDown);
	}

	get right() {
		return (this.keys.right.isDown || this.keys.D.isDown);
	}

	get down() {
		return (this.keys.down.isDown || this.keys.S.isDown);
	}

	get up() {
		return (this.keys.up.isDown || this.keys.W.isDown);
	}

	getInputDirection() {
		return {
			x: (-1 * this.left) + (1 * this.right),
			y: (-1 * this.up) + (1 * this.down),
		};
	}

	onTapDown(event) {
	}

	onTapUp(event) {
	}
}