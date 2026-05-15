import { Music, Heart, Play, Edit3, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";

const savedMelodies = [
  { id: 1, name: "My First Melody", author: "You", savedDate: "2026-04-20", noteCount: 12, isOwn: true },
  { id: 2, name: "Moonlit Serenade", author: "Luna", savedDate: "2026-04-22", noteCount: 8, isOwn: false },
  { id: 3, name: "Dawn's Whisper", author: "Aurora", savedDate: "2026-04-25", noteCount: 15, isOwn: false },
];

export function CollectionPage() {
  const navigate = useNavigate();
  const [melodies, setMelodies] = useState(savedMelodies);

  const handleEdit = (melodyId: number) => {
    navigate(`/?edit=${melodyId}`);
  };

  const handleDelete = (melodyId: number) => {
    if (confirm("Are you sure you want to delete this melody?")) {
      setMelodies(melodies.filter(m => m.id !== melodyId));
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>
            My Echoes
          </h2>
          <p className="text-white/50 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Feelings you've shared and discovered
          </p>
        </div>

        {melodies.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border border-white/10">
              <Music className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-white/60 mb-2" style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}>No saved echoes yet</h3>
            <p className="text-white/40 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Explore to discover feelings that resonate with you
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {melodies.map((melody) => (
              <motion.div
                key={melody.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                      <Music className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-white/90 mb-1">{melody.name}</h3>
                      <p className="text-sm text-white/50">
                        by {melody.author} • {melody.noteCount} notes
                      </p>
                      <p className="text-xs text-white/30 mt-1">
                        Saved {new Date(melody.savedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      title="Play"
                    >
                      <Play className="w-4 h-4 text-white/70" />
                    </motion.button>

                    {melody.isOwn && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(melody.id)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-teal-500/30 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4 text-emerald-300" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(melody.id)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-red-500/30 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </>
                    )}

                    {!melody.isOwn && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30"
                        title="Favorite"
                      >
                        <Heart className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
