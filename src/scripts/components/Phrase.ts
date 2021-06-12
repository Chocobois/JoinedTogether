export interface Phrase {
	text: string;
	audio?: string;
	draggable: boolean;
	empty: boolean;
}

let phraseData = {
	"1": {
		text: "You wake up, alone within a dark room",
		audio: "V_01",
		draggable: false,
		empty: false
	},

	"2a": {
		text: "In front of you lies a door, which is",
		audio: "V_02_Start",
		draggable: false,
		empty: false
	},
	"2b": {
		text: "open",
		audio: "V_02_End",
		draggable: false,
		empty: false
	},

	"3": {
		text: "After heading through the door, you come across a tunnel",
		audio: "V_03",
		draggable: false,
		empty: false
	},

	"4a": {
		text: "A dense buildup of cobwebs are",
		audio: "V_04_Start",
		draggable: false,
		empty: false
	},
	"4b": {
		text: "blocking your way.",
		audio: "V_04_End",
		draggable: false,
		empty: false
	},

	"empty": {
		text: "<empty>",
		audio: undefined,
		draggable: true,
		empty: true
	},
	"not": {
		text: "not",
		audio: "V_Not",
		draggable: true,
		empty: false
	},
};

let areaData = {
	"1": {
		hitarea: {x:100, y:100, w:100, h:100},
		phrases: ["1"]
	},
	"2": {
		hitarea: {x:400, y:100, w:100, h:100},
		phrases: ["2a", "not", "2b"]
	},
	"3": {
		hitarea: {x:700, y:100, w:100, h:100},
		phrases: ["3"]
	},
	"4": {
		hitarea: {x:1000, y:100, w:100, h:100},
		phrases: ["4a", "empty", "4b"]
	},
};

for (let name in areaData) {
	areaData[name].phrases = areaData[name].phrases.map(key => {return phraseData[key];});
}

export { phraseData, areaData };