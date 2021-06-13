import { BaseScene } from "./BaseScene";
import { GrayScalePostFilter } from "../pipelines/GrayScalePostFilter";
import { BlurPostFilter } from "../pipelines/BlurPostFilter";
import { images, tiles, spritesheets, audio } from "../assets";

export class PreloadScene extends BaseScene {
	tapToStart: any;

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
		let text = this.createText(x, y, 3*bar.height, "#DDD", "Loading...").setOrigin(0, 1.5);

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

		// Load tilemaps
		this.load.tilemapTiledJSON('map', 'assets/tilemaps/level1.json');
		for (let asset of tiles) {
			this.load.image(asset.key, asset.path);
		}

	}

	create() {
		// this.scene.start("GameScene");
		let width = 0.5 * this.W;
		let x = this.CX + width/2;
		let y = this.CY;
		this.tapToStart = this.createText(x, y, 3*8, "#FFD", "Tap to start!")
			.setOrigin(1.0, -0.5);

		this.input.on('pointerdown', this.start.bind(this));
	}

	update(time: number) {
		this.tapToStart.setAlpha(0.8+0.2*Math.sin(time/100));
	}

	start() {
		this.fade(true, 800, 0x000000);
		this.addEvent(1000, () => {
			this.scene.start("GameScene");
		});
	}
}