import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Note {
	key: string;
	position: number;
	angle: number;
	color: string;
}

interface MusicCylinderProps {
	notes: Note[];
	isPlaying: boolean;
	playheadPosition: number;
}

export function MusicCylinder({
	notes,
	isPlaying,
	playheadPosition,
}: MusicCylinderProps) {
	const [rotation, setRotation] = useState(0);

	useEffect(() => {
		if (!isPlaying) return;

		const interval = setInterval(() => {
			setRotation((prev) => (prev + 0.7) % 360);
		}, 50);

		return () => clearInterval(interval);
	}, [isPlaying]);

	return (
		<div className="relative flex h-[260px] w-full items-center justify-center">
			<motion.div
				className="relative"
				animate={{ rotateY: rotation }}
				transition={{ duration: 0.05, ease: "linear" }}
				style={{
					width: "180px",
					height: "230px",
					transformStyle: "preserve-3d",
				}}
			>
				{Array.from({ length: 24 }).map((_, index) => {
					const angle = (index / 24) * 360;

					return (
						<div
							key={index}
							className="absolute top-0 bottom-0 w-[18px]"
							style={{
								left: "50%",
								transform: `translateX(-50%) rotateY(${angle}deg) translateZ(90px)`,
								background:
									"linear-gradient(180deg, rgba(16,185,129,0.04), rgba(16,185,129,0.1), rgba(16,185,129,0.04))",
								borderLeft: "1px solid rgba(16,185,129,0.18)",
							}}
						/>
					);
				})}

				{notes.map((note, index) => (
					<motion.div
						key={`${note.key}-${index}`}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className="absolute rounded-full"
						style={{
							left: "50%",
							top: `${note.position}%`,
							width: "10px",
							height: "10px",
							background: note.color,
							boxShadow: `0 0 18px ${note.color}`,
							transform: `translateX(-50%) rotateY(${note.angle}deg) translateZ(94px)`,
						}}
					/>
				))}

				<div
					className="absolute left-0 h-[2px] w-full"
					style={{
						top: `${playheadPosition}%`,
						background:
							"linear-gradient(90deg, transparent, rgba(110,231,183,0.8), transparent)",
						boxShadow: "0 0 16px rgba(110,231,183,0.7)",
					}}
				/>
			</motion.div>

			<div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full bg-emerald-400/10 blur-3xl" />
		</div>
	);
}
