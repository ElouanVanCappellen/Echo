import { motion } from "motion/react";
import {
	Cloud,
	Sparkles,
	Zap,
	Clock,
	Heart,
	Compass,
	Coffee,
} from "lucide-react";

export type Mood = {
	id: string;
	name: string;
	icon: typeof Cloud;
	color: string;
	description: string;
	notes: number[]; // Scale degrees for auto-generation
};

export const moods: Mood[] = [
	{
		id: "calm",
		name: "Calm",
		icon: Cloud,
		color: "#6ee7b7",
		description: "Peaceful and serene",
		notes: [0, 2, 4, 5, 7], // Pentatonic major
	},
	{
		id: "dreamy",
		name: "Dreamy",
		icon: Sparkles,
		color: "#a7f3d0",
		description: "Floating and ethereal",
		notes: [0, 2, 3, 5, 7, 9], // Natural minor
	},
	{
		id: "energetic",
		name: "Energetic",
		icon: Zap,
		color: "#34d399",
		description: "Bright and playful",
		notes: [0, 2, 4, 7, 9], // Major pentatonic
	},
	{
		id: "nostalgic",
		name: "Nostalgic",
		icon: Clock,
		color: "#5eead4",
		description: "Warm memories",
		notes: [0, 3, 5, 7, 10], // Minor pentatonic
	},
	{
		id: "hopeful",
		name: "Hopeful",
		icon: Heart,
		color: "#2dd4bf",
		description: "Looking forward",
		notes: [0, 2, 4, 5, 7, 9], // Major scale
	},
	{
		id: "cozy",
		name: "Cozy",
		icon: Coffee,
		color: "#67e8f9",
		description: "Comfortable and safe",
		notes: [0, 2, 3, 5, 7, 8], // Dorian mode
	},
];

interface MoodSelectorProps {
	selectedMood: Mood | null;
	onSelectMood: (mood: Mood) => void;
}

export function MoodSelector({
	selectedMood,
	onSelectMood,
}: MoodSelectorProps) {
	return (
		<div className="w-full max-w-4xl">
			<div className="text-center mb-3">
				<h3
					className="text-white/80 text-sm mb-1"
					style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600 }}
				>
					How are you feeling?
				</h3>
			</div>

			<div className="grid grid-cols-7 gap-2">
				{moods.map((mood) => {
					const Icon = mood.icon;
					const isSelected = selectedMood?.id === mood.id;

					return (
						<motion.button
							key={mood.id}
							onClick={() => onSelectMood(mood)}
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							animate={{
								scale: isSelected ? 1.05 : 1,
								y: isSelected ? -2 : 0,
							}}
							className={`
                relative p-2 rounded-xl backdrop-blur-xl border transition-all
                ${
									isSelected
										? "bg-white/15 border-white/30 shadow-lg"
										: "bg-white/5 border-white/10 hover:bg-white/10"
								}
              `}
						>
							<div
								className="flex items-center justify-center w-8 h-8 mx-auto mb-1 rounded-full"
								style={{
									backgroundColor: `${mood.color}20`,
									border: `1px solid ${mood.color}40`,
								}}
							>
								<Icon className="w-4 h-4" style={{ color: mood.color }} />
							</div>
							<p
								className="text-white/90 text-xs font-medium"
								style={{ fontFamily: "Nunito, sans-serif" }}
							>
								{mood.name}
							</p>

							{isSelected && (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className="absolute inset-0 rounded-2xl"
									style={{
										background: `radial-gradient(circle at center, ${mood.color}10, transparent)`,
										filter: "blur(8px)",
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
					className="text-center text-white/50 text-xs mt-2"
					style={{ fontFamily: "Nunito, sans-serif" }}
				>
					{selectedMood.description}
				</motion.p>
			)}
		</div>
	);
}
