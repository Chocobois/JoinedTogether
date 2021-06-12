import { GameScene } from "../scenes/GameScene";
import { tiles } from "../assets"

export class World extends Phaser.GameObjects.Container {
	public scene: GameScene;

  private world: Phaser.Tilemaps.Tilemap;

  constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);

    this.world = scene.make.tilemap({ key: 'map' });

    let tileset: Phaser.Tilemaps.Tileset[] = [];
    for( let name of tiles )
    {
      tileset.push(this.world.addTilesetImage(name.key + ".png", name.key));
    }
    let layer = this.world.createLayer('Background', tileset, 0, 0);
    layer.setScale(3);
  }
}
