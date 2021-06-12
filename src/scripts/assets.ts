import { prependPath } from "./utils";


interface Image {
	key: string;
	path: string;
}

let loadImg = (name: string): Image => {
	return { key: name, path: name + ".png" }
}

const images: Image[] = prependPath("assets/images/", [
	loadImg("background"),
]);

const tiles: Image[] = prependPath("assets/tilemaps/", [
	loadImg("roof"),
	loadImg("floor"),
	loadImg("wall")
]);

interface SpriteSheet {
	key: string;
	path: string;
	width: number;
	height: number;
}
const spritesheets: SpriteSheet[] = prependPath("assets/spritesheets/", [
	{ key: 'mouse',		path: 'mouse.png',		width: 256,	height: 200 },
	{ key: 'cat',		path: 'cat.png',		width: 256,	height: 256 },
	{ key: 'thought',	path: 'thought.png',	width: 370,	height: 172 },
]);


interface Audio {
	key: string;
	path: string;
	volume: number;
}
const audio: Audio[] = prependPath("assets/audio/", [
	{ key: "Amb_Dungeon",	path: "Amb_Dungeon.mp3",	volume: 1.0 },
	{ key: "Char_Step_01",	path: "Char_Step_01.mp3",	volume: 1.0 },
	{ key: "Char_Step_02",	path: "Char_Step_02.mp3",	volume: 1.0 },
	{ key: "Char_Step_03",	path: "Char_Step_03.mp3",	volume: 1.0 },
	{ key: "Char_Step_04",	path: "Char_Step_04.mp3",	volume: 1.0 },
	{ key: "Nar_Static",	path: "Nar_Static.mp3",		volume: 1.0 },
	{ key: "UI_PickUp",		path: "UI_PickUp.mp3",		volume: 1.0 },
	{ key: "UI_PutDown",	path: "UI_PutDown.mp3",		volume: 1.0 },

	{ key: "V_01",			path: "V_01.mp3",			volume: 1.0 },
	{ key: "V_02_End",		path: "V_02_End.mp3",		volume: 1.0 },
	{ key: "V_02_Start",	path: "V_02_Start.mp3",		volume: 1.0 },
	{ key: "V_03",			path: "V_03.mp3",			volume: 1.0 },
	{ key: "V_04_End",		path: "V_04_End.mp3",		volume: 1.0 },
	{ key: "V_04_Start",	path: "V_04_Start.mp3",		volume: 1.0 },
	{ key: "V_Not",			path: "V_Not.mp3",			volume: 1.0 },
]);


export { images, tiles, spritesheets, audio };