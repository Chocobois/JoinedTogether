import { GameScene } from "./scenes/GameScene";
import { audio } from "./assets";

export class AudioManager {
	public scene: GameScene;

	private sounds: Map<string, Phaser.Sound.BaseSound>;

	constructor(scene: GameScene, x: number, y: number) {
		this.scene = scene;

		this.sounds = new Map();

		for (let asset of audio) {
			this.addSound(asset.key, asset.volume);
		}
	}

	addSound(key: string, volume: number) {
		let sound = this.scene.sound.add(key, {
			volume
		});

		this.sounds.set(key, sound);
	}

	play(key: string) {
		let audio = this.sounds.get(key);
		if (audio) {
			audio.play({ volume: 0.5, rate: 1.0 });
		}

		// volume
		// rate
		// detune
		// seek
		// loop
		// delay
		// pan
	}
}