import { GameScene } from "../scenes/GameScene";

export class World extends Phaser.GameObjects.Container {
	public scene: GameScene;

  private world: Phaser.Tilemaps.Tilemap;
  private layer: Phaser.Tilemaps.TilemapLayer;
  private rt: Phaser.GameObjects.RenderTexture;

  constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);

    this.world = scene.make.tilemap({ key: 'map' });

    let tiles = this.world.addTilesetImage('tiles', 'tiles');

    this.layer = this.world.createLayer('Background', tiles, 0, 0);

    this.rt = scene.add.renderTexture(0,0,1920/2,1080/2);

  }
}
