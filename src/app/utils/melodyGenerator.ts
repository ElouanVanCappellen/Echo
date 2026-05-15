import type { Mood } from "../components/MoodSelector";

type GeneratedNote = {
	key: string;
	position: number;
	angle: number;
	color: string;
};

const moodColors: Record<string, string> = {
	calm: "#6ee7b7",
	dreamy: "#a7f3d0",
	energetic: "#34d399",
	nostalgic: "#5eead4",
	hopeful: "#2dd4bf",
	curious: "#14b8a6",
	cozy: "#67e8f9",
};

const keyOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export function generateMelodyFromMood(mood: Mood, key: string): GeneratedNote {
	const noteIndex = keyOptions.indexOf(key);

	return {
		key,
		position: 15 + Math.random() * 70,
		angle: noteIndex * 36,
		color: moodColors[mood.id] || mood.color,
	};
}

export function generateSmallSongFromMood(mood: Mood): GeneratedNote[] {
	const amount = mood.id === "energetic" ? 10 : mood.id === "calm" ? 6 : 8;

	return Array.from({ length: amount }).map((_, index) => {
		const possibleNote = mood.notes[index % mood.notes.length];
		const key = keyOptions[possibleNote % keyOptions.length];

		return {
			key,
			position: 15 + ((index * 9) % 70),
			angle: (index * 42) % 360,
			color: moodColors[mood.id] || mood.color,
		};
	});
}
