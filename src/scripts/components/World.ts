import { GameScene } from "../scenes/GameScene";

export class World extends Phaser.GameObjects.Container {
	public scene: GameScene;
  public properties: {};

  private world: Phaser.Tilemaps.Tilemap;

  private loadProps()
  {
    this.properties = {};
    for( let index in this.world.properties )
    {
      let prop = this.world.properties[index];
      this.properties[prop.name] = prop.value;
    }
  }
  constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);
    this.world = scene.make.tilemap({ key: 'map' });
    this.loadProps();


    let tileset: Phaser.Tilemaps.Tileset[] = [];
    for( let tile of this.world.tilesets )
      tileset.push(this.world.addTilesetImage(tile.name, tile.name));

    let scale = this.properties["Scale"];

    let layer = this.world.createLayer('Background', tileset);
    layer.setPosition(layer.x*scale,layer.y*scale);
    layer.setScale(scale);

  }
}
