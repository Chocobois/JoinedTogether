import { BaseScene } from "./BaseScene";
import { AudioManager } from "../AudioManager";
import { Player } from "../components/Player";
import { Monster } from "../components/Monster";
import { Narrator } from "../components/Narrator";
import { Phrase, phraseData, areaData } from "../components/Phrase";
import { World } from "../components/World";

export class GameScene extends BaseScene {
	private audio: AudioManager;
	public player: Player;
	public monsters: any;
	private world: World;
	private narrator: Narrator;
	private keys: any;
	private zones: Phaser.GameObjects.Zone[];
	private zoneTimer: number;
	private currentZone?: Phaser.GameObjects.Zone;

	constructor() {
		super({key: "GameScene"});
	}

	create(): void {
		// Note: "fade", "CX", "CY", "containToScreen" is found in BaseScene

		// Background color and fading animation
		this.cameras.main.setBackgroundColor(0x000000);
		this.fade(false, 200, 0x000000);


		/* World */
		this.world = new World(this, 0,0);

		// Player
		let px = areaData["0"].hitarea.x;
		let py = areaData["0"].hitarea.y;
		this.player = new Player(this, px, py);
		// this.player.setScrollFactor(0, 0);
		this.physics.world.enable(this.player.sprite);
		this.cameras.main.startFollow(this.player.sprite);

		// Monster
		// this.guardMonster = new Monster(this, 400, 400);
		// this.monsters.push(this.guardMonster);

		// Narrator
		this.narrator = new Narrator(this, this.CX, 0.85*this.H);
		this.narrator.setScrollFactor(0, 0);

		// Audio
		this.audio = new AudioManager(this, this.CX, 0.85*this.H);

		// let pointer = this.add.image(this.player.x, this.player.y, "pointer");
		// pointer.setScale(0.4);

		// Light
		// let light1 = this.add.pointlight(1*200, 200, 0xFF7700, 256, 0.1, 0.1);

		this.createAreaTriggers();
		this.world.wallInPlayer(this.player);

		this.setupInput();
	}

	update(time: number, deltaMs: number): void {
		this.player.update(time, deltaMs);
		this.narrator.update(time, deltaMs);

		this.narrator.setAlpha(this.zoneTimer);
		this.zoneTimer -= 0.1;
		if (this.zoneTimer <= 0) {
			this.currentZone = undefined;
			this.narrator.onDragEnd();
		}

		this.player.isAsleep = (phraseData["0d"].trigger == "sleeping");
	}


	createAreaTriggers() {
		this.zones = [];

		for (let name in areaData) {
			let area = areaData[name];

			// let rect = this.add.rectangle(area.hitarea.x, area.hitarea.y, area.hitarea.w, area.hitarea.h, 0xFFFF00, 0.2);
			// rect.setOrigin(0);

			let zone = this.add.zone(area.hitarea.x, area.hitarea.y, area.hitarea.w, area.hitarea.h);
			this.zones.push(zone);
			this.physics.world.enable(zone);

			this.physics.add.overlap(this.player.sprite, zone, () => {
				this.zoneTimer = 2;
				if (this.currentZone != zone) {
					this.currentZone = zone;
					this.narrator.setPhrases(area.phrases);
				}
			});
		}
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
		if (!this.narrator.dragWord.drag) {
			return {
				x: (-1 * this.left) + (1 * this.right),
				y: (-1 * this.up) + (1 * this.down),
			};
		}
		else {
			return {
				x: 0,
				y: 0,
			};
		}
	}

	onTapDown(event) {
	}

	onTapUp(event) {
	}
}