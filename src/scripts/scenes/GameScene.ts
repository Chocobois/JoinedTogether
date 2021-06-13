import { BaseScene } from "./BaseScene";
import { AudioManager } from "../AudioManager";
import { Player } from "../components/Player";
import { Monster } from "../components/Monster";
import { Flower } from "../components/Flower";
import { Narrator } from "../components/Narrator";
import { Phrase, phraseData, areaData } from "../components/Phrase";
import { World } from "../components/World";

export class GameScene extends BaseScene {
	public audio: AudioManager;
	public player: Player;
	public monsters: any;
	public flowers: any;
	private darkness: Phaser.GameObjects.Rectangle;
	private world: World;
	private narrator: Narrator;
	private keys: any;
	private zones: Phaser.GameObjects.Zone[];
	private zoneTimer: number;
	private currentZone?: Phaser.GameObjects.Zone;
	private storyMode: string;
	private pointer: Phaser.GameObjects.Image;
	private curve: Phaser.Curves.CubicBezier;

	constructor() {
		super({key: "GameScene"});
	}

	create(): void {
		// Background color and fading animation
		this.cameras.main.setBackgroundColor(0x000000);
		this.fade(false, 3000, 0x000000);


		/* World */
		this.world = new World(this, 0,0);

		// Player
		this.player = new Player(this, areaData.sleep.hitarea.x, areaData.sleep.hitarea.y - 40);
		this.player.setDepth(5);
		// this.player.setScrollFactor(0, 0);

		this.physics.world.enable(this.player.sprite);
		this.cameras.main.startFollow(this.player.sprite);

		// Monsters
		this.monsters = {
			guard: new Monster(this, areaData.guard.hitarea.x, areaData.guard.hitarea.y),
			scared: new Monster(this, areaData.scared.hitarea.x, areaData.scared.hitarea.y),
			angry: new Monster(this, areaData.angry.hitarea.x, areaData.angry.hitarea.y),
			murder: new Monster(this, areaData.murder.hitarea.x, areaData.murder.hitarea.y),
			pesky: new Monster(this, areaData.pesky.hitarea.x, areaData.pesky.hitarea.y),
			clever: new Monster(this, areaData.clever.hitarea.x, areaData.clever.hitarea.y),
		};

		// Flowers
		this.flowers = {
			lifeless: new Flower(this, areaData.flower.hitarea.x, areaData.flower.hitarea.y, "flower", 0),
		};

		// Light
		// let light = this.add.image(this.CX, 0.85*this.H, "text_bg");
		// let light = this.add.pointlight(this.CX, 0.85*this.H, 0x000000, 256, 0.1, 0.1);
		// light.setScrollFactor(0, 0);
		// light.setScale(1, 0.2);

		// Darkness
		this.darkness = this.add.rectangle(this.CX, this.CY, this.W, this.H, 0x000000);
		// this.darkness.setDepth(10);
		this.darkness.setScrollFactor(0, 0);

		// Narrator
		this.narrator = new Narrator(this, this.CX, 0.85*this.H);
		this.narrator.setScrollFactor(0, 0);
		this.narrator.setDepth(10);

		// Audio
		this.audio = new AudioManager(this, this.CX, 0.85*this.H);

		this.audio.play("Amb_Dungeon", { loop: true });
		this.audio.play("Amb_DripAmogus", { loop: true });

		// Tutorial pointer
		this.pointer = this.add.image(this.CX, this.CY, "pointer");
		// this.pointer.setScrollFactor(0, 0);
		this.pointer.setDepth(1000);
		this.pointer.setScale(0.4);
		this.pointer.setOrigin(0.3);
		this.pointer.setAlpha(0);

		this.curve = new Phaser.Curves.CubicBezier(
			new Phaser.Math.Vector2(40, -150),
			new Phaser.Math.Vector2(300, -100),
			new Phaser.Math.Vector2(350, 50),
			new Phaser.Math.Vector2(250, 150),
		);


		this.storyMode = "intro";
		this.zoneTimer = -3;

		this.createAreaTriggers();
		this.world.wallInPlayer(this.player);

		this.setupInput();
	}

	update(time: number, deltaMs: number): void {
		let delta = deltaMs / 1000;

		this.player.update(time, delta);
		this.narrator.update(time, delta);

		// Triggers
		this.checkTriggers();

		this.narrator.setAlpha(this.zoneTimer);
		this.narrator.bg.setAlpha(this.zoneTimer);

		if (this.storyMode == "intro") {
			this.zoneTimer += delta;

			let t = 1 - ((time/3)%1000)/1000;
			t = Phaser.Math.Easing.Cubic.InOut(t);
			let p = this.curve.getPoint(t);
			this.pointer.x = p.x;
			this.pointer.y = p.y;
			this.pointer.setAlpha(this.zoneTimer/2 - 3);

			if (!this.player.isAsleep) {
				this.storyMode = "game";
				this.pointer.setVisible(false);
				this.audio.play("Amb_Music", { loop: true });
			}
		}
		else if (this.storyMode == "game") {
			this.darkness.setAlpha(this.darkness.alpha - 0.02);
			this.zoneTimer -= 0.05;
			if (this.zoneTimer <= 0) {
				this.currentZone = undefined;
				this.narrator.onDragEnd();
			}
		}

		for (let name in this.monsters) {
			this.monsters[name].update(time, delta);
		}
	}


	checkTriggers() {
		this.player.mood = phraseData.sleep_whois.trigger || "idle";

		this.monsters.guard.mood = phraseData.guard_whois.trigger || "angry";

		this.monsters.scared.mood = phraseData.scared_whois.trigger || "idle";
		if (this.player.mood == "angry" && this.monsters.scared.mood != "asleep")
			this.monsters.scared.mood = "scared";

		this.monsters.angry.mood = phraseData.angry_whois.trigger || "idle";

		this.monsters.murder.mood = phraseData.murder_ending.trigger || "idle";

		this.monsters.pesky.mood = phraseData.pesky_escape.trigger || "idle";

		this.monsters.clever.mood = phraseData.clever_escape.trigger || "idle";

		this.flowers.lifeless.setFrame((phraseData.flower_ending.trigger == "dead") ? 1 : 0);
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
				if (this.storyMode == "game") {
					this.zoneTimer = 2;
				}
				if (this.currentZone != zone) {
					this.currentZone = zone;
					this.narrator.setPhrases(area.phrases);

					if (this.storyMode == "game") {
						this.audio.play("UI_BoxAppear");
					}
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