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
	},
	"sleep_whois": {
		text: "who is asleep",
		draggable: true,
		trigger: "sleeping",
		type: "who is"
	},

	// Story
	"story_after_sleep": {
		text: "Yet through sheer will, it changed the story",
	},

	// Enemy guarding
	"guard_1": {
		text: "A mean monster",
	},
	"guard_whois": {
		text: "<empty>",
		draggable: true,
		empty: true,
		type: "who is"
	},
	"guard_2": {
		text: "is guarding the room",
	},

	// Angry monster

	"angry_1": {
		text: "The",
	},
	"angry_mood1": {
		text: "<empty>",
		draggable: true,
		empty: true,
		type: "mood"
	},
	"angry_2": {
		text: "cat meets another",
	},
	"angry_mood2": {
		text: "angry",
		draggable: true,
		type: "mood",
		trigger: "angry"
	},
	"angry_3": {
		text: "monster",
	},

	// Monster scared of cat
	"scared_1": {
		text: "The guarding monster",
	},
	"scared_whois": {
		text: "<empty>",
		draggable: true,
		empty: true,
		type: "who is"
	},
	"scared_2": {
		text: "is scared of angry cats",
	},

	// Lifeless flower
	"flower_1": {
		text: "Nothing here aside from a small flower",
	},
	"flower_ending": {
		text: "but sadly it is lifeless",
		draggable: true,
		type: "ending",
		trigger: "dead"
	},

	// Lifeless monster
	"murder_1": {
		text: "Another mean monster blocks your path",
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
	// },
	// "door_2": {
	// 	text: "which will hurt",
	// 	draggable: true,
	// 	type: "hurt"
	// },

	// mouth
	"pesky_1": {
		text: "The pesky cat thought it was being clever by",
	},
	"pesky_escape": {
		text: "putting words in my mouth",
		draggable: true,
		type: "escape"
	},

	// Too bad it will never be escaping like a hero any time soon
	// Ending
	"clever_1": {
		text: "Thanks for playing!",
	},
	// "clever_escape": {
		// text: "escaping",
		// draggable: true,
		// type: "escape"
	// },
	// "clever_2": {
		// text: "any time soon",
	// },
};

let k = 800;
let q = 32*4;
let areaData = {
	"sleep": {
		hitarea: {x:0*q, y:0*q, w:300, h:300},
		phrases: ["sleep_1", "sleep_not", "sleep_2", "sleep_whois"]
	},
	"story_after_sleep": {
		hitarea: {x:6*q, y:0*q, w:200, h:300},
		phrases: ["story_after_sleep"]
	},
	"guard": {
		hitarea: {x:10.5*q, y:-1*q, w:200, h:200},
		phrases: ["guard_1", "guard_whois", "guard_2"]
	},
	"angry": {
		hitarea: {x:5*q, y:-9*q, w:300, h:300},
		phrases: ["angry_1", "angry_mood1", "angry_2", "angry_mood2", "angry_3"]
	},
	"scared": {
		hitarea: {x:14*q, y:-8.5*q, w:200, h:300},
		phrases: ["scared_1", "scared_whois", "scared_2"]
	},
	"flower": {
		hitarea: {x:23*q, y:-16.5*q, w:300, h:300},
		phrases: ["flower_1", "flower_ending"]
	},
	"murder": {
		hitarea: {x:27*q, y:-12*q, w:200, h:300},
		phrases: ["murder_1", "murder_ending"]
	},
	"pesky": {
		hitarea: {x:34*q, y:-12*q, w:200, h:3000},
		phrases: ["pesky_1", "pesky_escape"]
	},
	"clever": {
		hitarea: {x:39*q, y:-12*q, w:400, h:3000},
		phrases: ["clever_1"]
	},
};

for (let name in areaData) {
	areaData[name].phrases = areaData[name].phrases.map(key => {return phraseData[key];});
}

export { phraseData, areaData };