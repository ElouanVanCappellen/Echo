import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { MusicCylinder } from "../components/MusicCylinder";
import { Controls } from "../components/Controls";
import { KeyboardHint } from "../components/KeyboardHint";
import { type Mood, moods } from "../components/MoodSelector";
import { motion } from "motion/react";
import { FloatingParticles } from "../components/FloatingParticles";
import {
	generateMelodyFromMood,
	generateSmallSongFromMood,
} from "../utils/melodyGenerator";
import { DiscoveryCard } from "../components/DiscoveryCard";
import { DuetVisualization } from "../components/DuetVisualization";
import { playNote } from "../utils/audio";

interface Note {
	key: string;
	position: number;
	angle: number;
	color: string;
}

const keyToNoteMap: { [key: string]: number } = {
	"1": 0,
	"2": 1,
	"3": 2,
	"4": 3,
	"5": 4,
	"6": 5,
	"7": 6,
	"8": 7,
	"9": 8,
	"0": 9,
};

export function CreatePage() {
	const [searchParams] = useSearchParams();
	const editId = searchParams.get("edit");

	const [notes, setNotes] = useState<Note[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playheadPosition, setPlayheadPosition] = useState(0);
	const [activeKey, setActiveKey] = useState<string | null>(null);
	const [savedMelody, setSavedMelody] = useState(false);
	const [melodyName, setMelodyName] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [selectedMood, setSelectedMood] = useState<Mood | null>(moods[0]);

	useEffect(() => {
		if (editId) {
			const saved = localStorage.getItem(`melody_${editId}`);
			if (saved) {
				const data = JSON.parse(saved);
				setNotes(data.notes || []);
				setMelodyName(data.name || "");
				setIsEditing(true);
			}
		}
	}, [editId]);

	const addNote = useCallback(
		(key: string) => {
			if (keyToNoteMap[key] === undefined || !selectedMood) return;

			const newNote = generateMelodyFromMood(selectedMood, key);

			playNote(key);

			setNotes((oldNotes) => [...oldNotes, newNote]);
			setActiveKey(key);

			setTimeout(() => {
				setActiveKey(null);
			}, 180);
		},
		[selectedMood],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key in keyToNoteMap && !e.repeat) {
				addNote(e.key);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [addNote]);

	useEffect(() => {
		if (isPlaying) {
			const interval = setInterval(() => {
				setPlayheadPosition((prev) => (prev + 1) % 100);
			}, 100);
			return () => clearInterval(interval);
		}
	}, [isPlaying]);

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleClear = () => {
		setNotes([]);
		setIsPlaying(false);
		setPlayheadPosition(0);
		setSavedMelody(false);
	};

	function handleGenerateFromMood() {
		if (!selectedMood) return;

		const generatedNotes = generateSmallSongFromMood(selectedMood);
		setNotes(generatedNotes);
		setSavedMelody(false);
	}

	const handleSave = () => {
		const melodyData = {
			notes,
			name: melodyName || "Untitled Melody",
			savedDate: new Date().toISOString(),
		};

		const id = editId || Date.now().toString();
		localStorage.setItem(`melody_${id}`, JSON.stringify(melodyData));
		setSavedMelody(true);

		setTimeout(() => {
			setSavedMelody(false);
		}, 3000);
	};

	return (
		<div className="relative">
			<FloatingParticles />

			{/* Hero Section - Fits in 1vh */}
			<div className="relative h-[calc(100vh-80px)] py-6 px-12">
				<div className="relative z-10 h-full max-w-7xl mx-auto grid grid-cols-2 gap-16 items-center">
					{/* Left Column - Controls */}
					<div className="flex flex-col justify-center space-y-7">
						<div>
							<h2
								className="text-white/90 mb-2"
								style={{
									fontFamily: "Fredoka One, cursive",
									fontSize: "1.75rem",
								}}
							>
								{isEditing ? "Shape Your Echo" : "Create Your Echo"}
							</h2>
							<p
								className="text-white/50 text-sm"
								style={{ fontFamily: "Nunito, sans-serif" }}
							>
								{isEditing
									? "Express how you're feeling through sound"
									: "Leave a small echo for someone else to discover"}
							</p>
						</div>

						{/* Melody name input */}
						<div>
							<label
								className="block text-white/70 text-sm mb-2"
								style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
							>
								Name your echo
							</label>
							<input
								type="text"
								value={melodyName}
								onChange={(e) => setMelodyName(e.target.value)}
								placeholder="Untitled Echo"
								className="w-full px-4 py-2.5 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all"
								style={{ fontFamily: "Nunito, sans-serif" }}
							/>
						</div>

						{/* Mood Selector */}
						<div>
							<label
								className="block text-white/70 text-sm mb-2.5"
								style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
							>
								How are you feeling?
							</label>
							<div className="grid grid-cols-3 gap-2.5">
								{moods.map((mood) => {
									const Icon = mood.icon;
									const isSelected = selectedMood?.id === mood.id;

									return (
										<motion.button
											key={mood.id}
											onClick={() => setSelectedMood(mood)}
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.95 }}
											animate={{
												scale: isSelected ? 1.05 : 1,
												y: isSelected ? -2 : 0,
											}}
											className={`
                        relative p-3 rounded-lg backdrop-blur-xl border transition-all
                        ${
													isSelected
														? "bg-white/15 border-white/30 shadow-lg"
														: "bg-white/5 border-white/10 hover:bg-white/10"
												}
                      `}
										>
											<div
												className="flex items-center justify-center w-9 h-9 mx-auto mb-2 rounded-full"
												style={{
													backgroundColor: `${mood.color}20`,
													border: `1px solid ${mood.color}40`,
												}}
											>
												<Icon
													className="w-5 h-5"
													style={{ color: mood.color }}
												/>
											</div>
											<p
												className="text-white/90 text-xs font-medium text-center"
												style={{ fontFamily: "Nunito, sans-serif" }}
											>
												{mood.name}
											</p>

											{isSelected && (
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													className="absolute inset-0 rounded-lg"
													style={{
														background: `radial-gradient(circle at center, ${mood.color}10, transparent)`,
														filter: "blur(6px)",
													}}
												/>
											)}
										</motion.button>
									);
								})}
							</div>
							{selectedMood && (
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-white/50 text-xs mt-2.5"
									style={{ fontFamily: "Nunito, sans-serif" }}
								>
									{selectedMood.description}
								</motion.p>
							)}

							<button
								onClick={handleGenerateFromMood}
								className="mt-4 w-full rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-4 py-2.5 text-sm text-emerald-100 transition-all hover:bg-emerald-400/20"
								style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
							>
								Generate melody from feeling
							</button>
						</div>

						{/* Controls */}
						<div className="space-y-3">
							<Controls
								isPlaying={isPlaying}
								onPlayPause={handlePlayPause}
								onClear={handleClear}
								onSave={handleSave}
								hasNotes={notes.length > 0}
							/>

							{savedMelody && (
								<p
									className="text-emerald-300 text-sm"
									style={{ fontFamily: "Nunito, sans-serif" }}
								>
									✨ Echo {isEditing ? "updated" : "saved"}! Your feeling is now
									part of the world.
								</p>
							)}
						</div>
					</div>

					{/* Right Column - Cylinder & Keyboard */}
					<div className="flex flex-col items-center justify-center gap-7">
						<div className="scale-95">
							<MusicCylinder
								notes={notes}
								isPlaying={isPlaying}
								playheadPosition={playheadPosition}
							/>
						</div>

						<div className="w-full">
							<div className="scale-95">
								<KeyboardHint activeKey={activeKey} />
							</div>
							<p
								className="text-center text-white/30 text-xs mt-3"
								style={{ fontFamily: "Nunito, sans-serif" }}
							>
								Press keys 1-9, 0 to express yourself
							</p>
						</div>
					</div>
				</div>

				{/* Scroll indicator */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
					<div className="flex flex-col items-center gap-1">
						<p
							className="text-white/40 text-xs"
							style={{ fontFamily: "Nunito, sans-serif" }}
						>
							Discover more echoes
						</p>
						<svg
							className="w-5 h-5 text-emerald-300/60"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Discovery Section - Below the fold */}
			<div className="relative min-h-screen py-16 px-8 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2
							className="text-3xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4"
							style={{ fontFamily: "Fredoka One, cursive" }}
						>
							Discover Echoes
						</h2>
						<p
							className="text-white/50 text-sm mb-8"
							style={{ fontFamily: "Nunito, sans-serif" }}
						>
							Feel what others are expressing around the world
						</p>
					</div>

					{/* Featured echoes grid */}
					<DiscoveryGrid />
				</div>
			</div>
		</div>
	);
}

function DiscoveryGrid() {
	const [showDuet, setShowDuet] = useState(false);
	const [matchedName, setMatchedName] = useState("");

	const featuredEchoes = [
		{
			id: 1,
			name: "Moonlit Serenade",
			noteCount: 12,
			author: "Luna",
			mood: "Dreamy",
		},
		{
			id: 2,
			name: "Dawn's Whisper",
			noteCount: 8,
			author: "Aurora",
			mood: "Calm",
		},
		{
			id: 3,
			name: "Cosmic Echo",
			noteCount: 15,
			author: "Stella",
			mood: "Curious",
		},
		{
			id: 4,
			name: "Velvet Dreams",
			noteCount: 10,
			author: "River",
			mood: "Cozy",
		},
		{
			id: 5,
			name: "Ocean Breeze",
			noteCount: 14,
			author: "Marina",
			mood: "Calm",
		},
		{
			id: 6,
			name: "Forest Path",
			noteCount: 9,
			author: "Sage",
			mood: "Nostalgic",
		},
		{
			id: 7,
			name: "Starlight Dance",
			noteCount: 11,
			author: "Nova",
			mood: "Hopeful",
		},
		{
			id: 8,
			name: "Autumn Leaves",
			noteCount: 13,
			author: "Ember",
			mood: "Nostalgic",
		},
	];

	const handleMatch = (name: string) => {
		setMatchedName(name);
		setShowDuet(true);
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{featuredEchoes.map((echo) => (
					<DiscoveryCard
						key={echo.id}
						name={echo.name}
						noteCount={echo.noteCount}
						onListen={() => {}}
						onMatch={() => handleMatch(echo.author)}
					/>
				))}
			</div>

			{showDuet && (
				<DuetVisualization
					matchName={matchedName}
					onClose={() => setShowDuet(false)}
				/>
			)}
		</>
	);
}
