import { Link } from "react-router";
import { Home } from "lucide-react";
import { motion } from "motion/react";

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-8">
      <div className="text-center">
        <h1 className="text-6xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl text-white/90 mb-4">Page Not Found</h2>
        <p className="text-white/50 mb-8">
          The melody you're looking for doesn't exist
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 mx-auto rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/30"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
