import { motion } from "motion/react";
import { Music2, Heart } from "lucide-react";

interface DiscoveryCardProps {
  name: string;
  noteCount: number;
  onListen: () => void;
  onMatch: () => void;
}

export function DiscoveryCard({ name, noteCount, onListen, onMatch }: DiscoveryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white/90 mb-1" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>{name}</h3>
          <p className="text-sm text-white/50" style={{ fontFamily: 'Nunito, sans-serif' }}>{noteCount} feelings</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
          <Music2 className="w-5 h-5 text-emerald-300" />
        </div>
      </div>

      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onListen}
          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 transition-colors"
          style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 500 }}
        >
          Feel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMatch}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-colors"
        >
          <Heart className="w-4 h-4 text-emerald-300" />
        </motion.button>
      </div>

      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-teal-500/0 hover:from-emerald-500/5 hover:to-teal-500/5 transition-colors pointer-events-none" />
    </motion.div>
  );
}
