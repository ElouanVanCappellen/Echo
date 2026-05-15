import { motion } from "motion/react";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const noteNames = ["C", "D", "E", "F", "G", "A", "B", "C#", "D#", "F#"];

interface KeyboardHintProps {
  activeKey: string | null;
}

export function KeyboardHint({ activeKey }: KeyboardHintProps) {
  return (
    <div className="flex items-center gap-2">
      {keys.map((key, index) => {
        const isActive = activeKey === key;
        return (
          <motion.div
            key={key}
            animate={{
              scale: isActive ? 1.1 : 1,
              y: isActive ? -4 : 0,
            }}
            className={`
              relative flex flex-col items-center justify-center w-12 h-16 rounded-lg
              backdrop-blur-xl border transition-all
              ${
                isActive
                  ? "bg-gradient-to-b from-emerald-500/40 to-teal-500/40 border-emerald-400/60 shadow-lg shadow-emerald-500/40"
                  : "bg-white/5 border-white/10"
              }
            `}
          >
            <span className={`text-sm ${isActive ? "text-white" : "text-white/60"}`}>
              {noteNames[index]}
            </span>
            <span className={`text-xs mt-1 ${isActive ? "text-white/90" : "text-white/40"}`}>
              {key}
            </span>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-lg bg-gradient-to-b from-emerald-500/20 to-teal-500/20"
                style={{ filter: "blur(8px)" }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
