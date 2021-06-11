import { prependPath } from "./utils";

interface Image {
	key: string;
	path: string;
}

const images: Image[] = prependPath("assets/images/", [
	{ key: "player",	path: "player.png" },
	{ key: "background",	path: "background.png" },
]);


interface SpriteSheet {
	key: string;
	path: string;
	width: number;
	height: number;
}

const spritesheets: SpriteSheet[] = prependPath("assets/spritesheets/", [
	{ key: 'mouse',		path: 'mouse.png',	width: 256,	height: 200 }
]);


// const audio: Asset[] = prependPath("assets/audio/", []);

export { images, spritesheets };