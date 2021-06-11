import { BaseScene } from "./BaseScene";
import { images, audio } from "../assets";


export class PreloadScene extends BaseScene {
	constructor() {
		super({key: "PreloadScene"});
	}

	init() {
		// let renderer = (this.renderer as Phaser.Renderer.WebGL.WebGLRenderer);
		// renderer.pipelines.addPostPipeline("GrayScalePostFilter", GrayScalePostFilter);
		// renderer.pipelines.addPostPipeline("BlurPostFilter", BlurPostFilter);
	}

	preload() {
		// Loading bar
		let width = 0.5 * this.W;
		let x = this.CX - width/2;
		let y = this.CY;
		let bg = this.add.rectangle(x, y, width, 4, 0x666666).setOrigin(0, 0.5);
		let bar = this.add.rectangle(x, y, 1, 8, 0xDDDDDD).setOrigin(0, 0.5);

		// Loading text
		let text = this.createText(x, y, 3*bar.height, this.weights.bold, "#DDD", "Loading...").setOrigin(0, 1.5);

		// Listener
		this.load.on("progress", (progress) => {
			bar.width = progress * width;
		});


		// Load images
		for (let image of images) {
			this.load.image(image.key, image.path);
		}
	}

	create() {
		// let bg = this.add.image(this.CX, this.CY, 'bg_serengeti');
		// this.fitToScreen(bg);

		this.fade(true, 100, 0x000000);
		this.addEvent(110, () => {
			this.scene.start("GameScene");
		});
	}
}