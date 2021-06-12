import { BaseScene } from "./BaseScene";
import { GrayScalePostFilter } from "../pipelines/GrayScalePostFilter";
import { BlurPostFilter } from "../pipelines/BlurPostFilter";
import { images, spritesheets, audio } from "../assets";

export class PreloadScene extends BaseScene {
	constructor() {
		super({key: "PreloadScene"});
	}

	init() {
		let renderer = (this.renderer as Phaser.Renderer.WebGL.WebGLRenderer);
		renderer.pipelines.addPostPipeline("GrayScalePostFilter", GrayScalePostFilter);
		renderer.pipelines.addPostPipeline("BlurPostFilter", BlurPostFilter);
	}

	preload() {
		/* Loading bar */

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


		/* Assets */

		// Load images
		for (let asset of images) {
			this.load.image(asset.key, asset.path);
		}

		// Load spritesheets
		for (let asset of spritesheets) {
			this.load.spritesheet(asset.key, asset.path, { frameWidth: asset.width, frameHeight: asset.height });
		}

		// Load audio
		for (let asset of audio) {
			this.load.audio(asset.key, [asset.path]);
		}

		// Load map
		this.load.image('tiles', 'assets/tilemaps/tiles.png');
		this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
	}

	create() {
		this.fade(true, 100, 0x000000);
		this.addEvent(110, () => {
			this.scene.start("GameScene");
		});
	}
}