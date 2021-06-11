import { prependPath } from "./utils";

interface Asset {
	key: string;
	path: string;
}

const images: Asset[] = prependPath("assets/images/", [
	{ key: "player",	path: "player.png" },
	{ key: "background",	path: "background.png" },
]);

const audio: Asset[] = prependPath("assets/audio/", [
]);

export { images, audio };