import { useState } from "react";
import { DiscoveryCard } from "../components/DiscoveryCard";
import { DuetVisualization } from "../components/DuetVisualization";
import { Search } from "lucide-react";

const mockDiscoveryMelodies = [
  { id: 1, name: "Moonlit Serenade", noteCount: 12, author: "Luna" },
  { id: 2, name: "Dawn's Whisper", noteCount: 8, author: "Aurora" },
  { id: 3, name: "Cosmic Echo", noteCount: 15, author: "Stella" },
  { id: 4, name: "Velvet Dreams", noteCount: 10, author: "River" },
  { id: 5, name: "Ocean Breeze", noteCount: 14, author: "Marina" },
  { id: 6, name: "Forest Path", noteCount: 9, author: "Sage" },
  { id: 7, name: "Starlight Dance", noteCount: 11, author: "Nova" },
  { id: 8, name: "Autumn Leaves", noteCount: 13, author: "Ember" },
];

export function DiscoverPage() {
  const [showDuet, setShowDuet] = useState(false);
  const [matchedName, setMatchedName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleMatch = (name: string) => {
    setMatchedName(name);
    setShowDuet(true);
  };

  const filteredMelodies = mockDiscoveryMelodies.filter((melody) =>
    melody.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    melody.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>
            Explore Echoes
          </h2>
          <p className="text-white/50 text-sm mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Discover how others are feeling • Find friends through shared emotions
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search echoes or friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            />
          </div>
        </div>

        {/* Grid of discovery cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMelodies.map((melody) => (
            <DiscoveryCard
              key={melody.id}
              name={melody.name}
              noteCount={melody.noteCount}
              onListen={() => {}}
              onMatch={() => handleMatch(melody.author)}
            />
          ))}
        </div>

        {filteredMelodies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40" style={{ fontFamily: 'Nunito, sans-serif' }}>No echoes found matching your search</p>
          </div>
        )}
      </div>

      {showDuet && (
        <DuetVisualization
          matchName={matchedName}
          onClose={() => setShowDuet(false)}
        />
      )}
    </div>
  );
}
