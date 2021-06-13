export interface Phrase {
	text: string;
	audio?: string;
	draggable: boolean;
	empty: boolean;
	trigger?: string;
	type?: string;
}

let phraseData: any = {
	"player": {
		text: "<empty>",
		audio: undefined,
		draggable: true,
		empty: true
	},

	// Cat sleeping
	"sleep_1": {
		text: "Deep in a dungeon, there is",
		draggable: false,
		empty: false
	},
	"sleep_not": {
		text: "<empty>",
		draggable: true,
		empty: true,
		trigger: "dead",
		type: "not"
	},
	"sleep_2": {
		text: "a cat",
		draggable: false,
		empty: false
	},
	"sleep_whois": {
		text: "who is asleep",
		draggable: true,
		empty: false,
		trigger: "sleeping",
		type: "who is"
	},

	// Enemy guarding
	"guard_1": {
		text: "A mean monster",
		draggable: false,
		empty: false
	},
	"guard_whois": {
		text: "<empty>",
		draggable: true,
		empty: true,
		type: "who is"
	},
	"guard_2": {
		text: "is guarding the room",
		draggable: false,
		empty: false
	},

	// Monster scared of cat
	"scared_1": {
		text: "The guarding monster",
		draggable: false,
		empty: false
	},
	"scared_whois": {
		text: "<empty>",
		draggable: true,
		empty: true,
		type: "who is"
	},
	"scared_2": {
		text: "is scared of angry cats",
		draggable: false,
		empty: false
	},

	// Random angry monster
	"angry_1": {
		text: "A monster",
		draggable: false,
		empty: false
	},
	"angry_whois": {
		text: "who is angry",
		draggable: true,
		empty: false,
		type: "who is",
		trigger: "angry"
	},
	"angry_2": {
		text: "is minding his own business",
		draggable: false,
		empty: false
	},

	// Lifeless flower
	"flower_1": {
		text: "Nothing here aside from a small flower",
		draggable: false,
		empty: false
	},
	"flower_ending": {
		text: "but sadly it is lifeless",
		draggable: true,
		empty: false,
		type: "ending",
		trigger: "dead"
	},

	// Lifeless monster
	"murder_1": {
		text: "Another mean monster blocks your path",
		draggable: false,
		empty: false
	},
	"murder_ending": {
		text: "<empty>",
		draggable: true,
		empty: true,
		type: "ending"
	},

	// Door
	// "door_1": {
	// 	text: "Before long, there",
	// 	draggable: false,
	// 	empty: false
	// },
	// "door_2": {
	// 	text: "which will hurt",
	// 	draggable: true,
	// 	empty: false,
	// 	type: "hurt"
	// },

	// mouth
	"pesky_1": {
		text: "The pesky cat thought it was being clever by",
		draggable: false,
		empty: false
	},
	"pesky_escape": {
		text: "putting words in my mouth",
		draggable: true,
		empty: false,
		type: "escape"
	},

	// Too bad it will never be escaping like a hero any time soon
	// Ending
	"clever_1": {
		text: "Haha! Too bad it will never be",
		draggable: false,
		empty: false
	},
	"clever_escape": {
		text: "escaping",
		draggable: true,
		empty: false,
		type: "escape"
	},
	"clever_2": {
		text: "any time soon",
		draggable: false,
		empty: false
	},
};

let areaData = {
	"sleep": {
		hitarea: {x:0,    y:0, w:400, h:400},
		phrases: ["sleep_1", "sleep_not", "sleep_2", "sleep_whois"]
	},
	"guard": {
		hitarea: {x:1000, y:0, w:400, h:400},
		phrases: ["guard_1", "guard_whois", "guard_2"]
	},
	"scared": {
		hitarea: {x:2000, y:0, w:400, h:400},
		phrases: ["scared_1", "scared_whois", "scared_2"]
	},
	"angry": {
		hitarea: {x:3000, y:0, w:400, h:400},
		phrases: ["angry_1", "angry_whois", "angry_2"]
	},
	"flower": {
		hitarea: {x:4000, y:0, w:400, h:400},
		phrases: ["flower_1", "flower_ending"]
	},
	"murder": {
		hitarea: {x:5000, y:0, w:400, h:400},
		phrases: ["murder_1", "murder_ending"]
	},
	"pesky": {
		hitarea: {x:6000, y:0, w:400, h:400},
		phrases: ["pesky_1", "pesky_escape"]
	},
	"clever": {
		hitarea: {x:7000, y:0, w:400, h:400},
		phrases: ["clever_1", "clever_escape", "clever_2"]
	},
};

for (let name in areaData) {
	areaData[name].phrases = areaData[name].phrases.map(key => {return phraseData[key];});
}

export { phraseData, areaData };