const noteFrequencies: Record<string, number> = {
	"1": 261.63, // C
	"2": 293.66, // D
	"3": 329.63, // E
	"4": 349.23, // F
	"5": 392.0, // G
	"6": 440.0, // A
	"7": 493.88, // B
	"8": 554.37, // C#
	"9": 622.25, // D#
	"0": 739.99, // F#
};

let audioContext: AudioContext | null = null;

function getAudioContext() {
	if (!audioContext) {
		audioContext = new AudioContext();
	}

	return audioContext;
}

export function playNote(key: string) {
	const frequency = noteFrequencies[key];

	if (!frequency) return;

	const context = getAudioContext();

	const oscillator = context.createOscillator();
	const gain = context.createGain();

	oscillator.type = "sine";
	oscillator.frequency.setValueAtTime(frequency, context.currentTime);

	gain.gain.setValueAtTime(0.18, context.currentTime);
	gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);

	oscillator.connect(gain);
	gain.connect(context.destination);

	oscillator.start();
	oscillator.stop(context.currentTime + 0.45);
}
