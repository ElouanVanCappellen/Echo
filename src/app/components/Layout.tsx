import { Outlet, Link, useLocation } from "react-router";
import { Home, User, MessageCircle, Music, Compass } from "lucide-react";
import { motion } from "motion/react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Create" },
    { path: "/discover", icon: Compass, label: "Explore" },
    { path: "/collection", icon: Music, label: "My Echoes" },
    { path: "/contacts", icon: MessageCircle, label: "Friends" },
    { path: "/account", icon: User, label: "Profile" },
  ];

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 border border-emerald-400/30">
              <Music className="w-5 h-5 text-emerald-300" />
            </div>
            <h1 className="text-2xl bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 bg-clip-text text-transparent" style={{ fontFamily: 'Fredoka One, cursive' }}>
              Echo Box
            </h1>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl transition-all
                      ${isActive
                        ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 text-emerald-200"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                      }
                    `}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
