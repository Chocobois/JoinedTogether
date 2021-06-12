import { GameScene } from "../scenes/GameScene";
import { Phrase } from "./Phrase";

export class DragWord extends Phaser.GameObjects.Text {
	public lock: boolean;
	public goalX: number;
	public goalY: number;
	public dragX: number;
	public dragY: number;
	public dragOffsetX: number;
	public dragOffsetY: number;
	public drag: boolean;

	constructor(scene: GameScene, config: Phaser.Types.GameObjects.Text.TextStyle) {
		super(scene, 0, 0, "", config);
		this.scene = scene;

		this.setOrigin(0, 0.5);
		this.setVisible(false);

		this.setStroke("#FF0000", 4);

		this.lock = false;
		this.goalX = 0;
		this.goalY = 0;
		this.dragX = 0;
		this.dragY = 0;
		this.dragOffsetX = 0;
		this.dragOffsetY = 0;
		this.drag = false;
	}

	update(time: number, delta: number) {
		if (this.drag) {
			this.x += (this.goalX - this.x) / 2.0;
			this.y += (this.goalY - this.y) / 2.0;
		}
	}
}