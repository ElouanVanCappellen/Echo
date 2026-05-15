import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";

interface DuetVisualizationProps {
  onClose: () => void;
  matchName: string;
}

export function DuetVisualization({ onClose, matchName }: DuetVisualizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative p-12 rounded-3xl bg-gradient-to-br from-emerald-900/40 to-teal-900/40 backdrop-blur-xl border border-emerald-500/30 shadow-2xl max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated hearts */}
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-8 h-8 text-teal-400 fill-teal-400" />
          </motion.div>
        </div>

        {/* Sparkles */}
        <div className="absolute top-8 left-8">
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </motion.div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl shadow-emerald-500/50"
          >
            <Music2Icon className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl mb-4 bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent"
            style={{ fontFamily: 'Fredoka One, cursive' }}
          >
            You're in Harmony!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 mb-8"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Your echo resonates with <span className="text-emerald-300">{matchName}</span>'s feelings
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/30"
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
          >
            Connect
          </motion.button>
        </div>

        {/* Background glow effect */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
      </motion.div>
    </motion.div>
  );
}

function Music2Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
      />
    </svg>
  );
}
