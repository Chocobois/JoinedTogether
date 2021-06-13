import { GameScene } from "../scenes/GameScene";

export class World extends Phaser.GameObjects.Container {
	public scene: GameScene;
  public properties: {};

  private wallLayer;
  private groundLayer;

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

  public wallInPlayer(player: Phaser.GameObjects.GameObject)
  {
    this.wallLayer.setCollisionByExclusion([-1]);
    this.scene.physics.collide(player, this.wallLayer);
  }

  constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y);
		this.scene = scene;
		this.scene.add.existing(this);
    this.world = scene.make.tilemap({ key: 'map' });
    this.loadProps();


    let tileset: Phaser.Tilemaps.Tileset[] = [];
    for( let tile of this.world.tilesets )
    {
      let ts = this.world.addTilesetImage(tile.name, tile.name);
      tileset.push(ts);
    }

    let scale = this.properties["Scale"];

    this.wallLayer = this.world.createLayer('Background', tileset);
    this.wallLayer.setPosition(this.wallLayer.x*scale,this.wallLayer.y*scale);
    this.wallLayer.setScale(scale);


    this.groundLayer = this.world.createLayer('Ground', tileset);
    this.groundLayer.setPosition(this.groundLayer.x*scale,this.groundLayer.y*scale);
    this.groundLayer.setScale(scale);
  }
}
