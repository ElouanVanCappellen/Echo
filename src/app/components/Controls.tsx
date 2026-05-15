import { Play, Pause, RotateCcw, Save } from "lucide-react";
import { motion } from "motion/react";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onClear: () => void;
  onSave: () => void;
  hasNotes: boolean;
}

export function Controls({ isPlaying, onPlayPause, onClear, onSave, hasNotes }: ControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
        disabled={!hasNotes}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-emerald-200" />
        ) : (
          <Play className="w-6 h-6 text-emerald-200 ml-0.5" />
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        disabled={!hasNotes}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-slate-700/20 to-slate-600/20 backdrop-blur-xl border border-slate-500/30 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-500/10"
      >
        <RotateCcw className="w-5 h-5 text-slate-200" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSave}
        disabled={!hasNotes}
        className="flex items-center gap-2 px-6 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 backdrop-blur-xl border border-emerald-400/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-emerald-500/30"
      >
        <Save className="w-5 h-5 text-white" />
        <span className="text-white" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>Save Echo</span>
      </motion.button>
    </div>
  );
}
