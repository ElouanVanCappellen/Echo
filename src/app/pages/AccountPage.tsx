import { useState } from "react";
import { Music, Save, LogOut, User } from "lucide-react";
import { motion } from "motion/react";

export function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ username: "", email: "", password: "" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
              <Music className="w-8 h-8 text-emerald-300" />
            </div>
            <h2 className="text-2xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Fredoka One, cursive' }}>
              {showLogin ? "Welcome Back" : "Join Echo Box"}
            </h2>
            <p className="text-white/50 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
              {showLogin ? "Sign in to your account" : "Begin your emotional journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!showLogin && (
              <div>
                <label className="block text-white/70 text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                  placeholder="Choose a username"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/30"
            >
              {showLogin ? "Sign In" : "Create Account"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="text-emerald-300 text-sm hover:text-emerald-200 transition-colors"
            >
              {showLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>
            My Profile
          </h2>
          <p className="text-white/50 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Your emotional space
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile section */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <User className="w-10 h-10 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-white/90 mb-1">{formData.username || "Musical User"}</h3>
                <p className="text-sm text-white/50">{formData.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </motion.button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 text-center">
              <p className="text-2xl text-emerald-300 mb-1" style={{ fontFamily: 'Fredoka One, cursive' }}>1</p>
              <p className="text-sm text-white/50" style={{ fontFamily: 'Nunito, sans-serif' }}>Echoes Shared</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 text-center">
              <p className="text-2xl text-teal-300 mb-1" style={{ fontFamily: 'Fredoka One, cursive' }}>3</p>
              <p className="text-sm text-white/50" style={{ fontFamily: 'Nunito, sans-serif' }}>Friends</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 text-center">
              <p className="text-2xl text-cyan-300 mb-1" style={{ fontFamily: 'Fredoka One, cursive' }}>5</p>
              <p className="text-sm text-white/50" style={{ fontFamily: 'Nunito, sans-serif' }}>Resonances</p>
            </div>
          </div>

          {/* Logout button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white/90 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  );
}
