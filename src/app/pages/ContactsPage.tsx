import { MessageCircle, Music, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const contacts = [
  { id: 1, name: "Luna", lastMessage: "I loved your melody!", time: "2h ago", unread: 2, online: true },
  { id: 2, name: "Aurora", lastMessage: "Want to create a duet?", time: "5h ago", unread: 0, online: true },
  { id: 3, name: "Stella", lastMessage: "Thanks for connecting!", time: "1d ago", unread: 0, online: false },
  { id: 4, name: "River", lastMessage: "Your music is amazing", time: "2d ago", unread: 1, online: false },
];

export function ContactsPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, sender: "Luna", text: "Hey! I really loved your melody!", time: "2:30 PM", isOwn: false },
    { id: 2, sender: "You", text: "Thank you so much! I loved yours too!", time: "2:32 PM", isOwn: true },
    { id: 3, sender: "Luna", text: "I loved your melody!", time: "2:35 PM", isOwn: false },
  ];

  const handleSend = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Fredoka One, cursive' }}>
            Friends
          </h2>
          <p className="text-white/50 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Connect with people who share your feelings
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 h-[600px]">
          {/* Contact list */}
          <div className="col-span-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white/90">Messages</h3>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {contacts.map((contact) => (
                <motion.button
                  key={contact.id}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 flex items-center gap-3 border-b border-white/5 transition-colors ${
                    selectedContact.id === contact.id ? "bg-white/10" : ""
                  }`}
                >
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                      <Music className="w-5 h-5 text-emerald-300" />
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white/90 text-sm">{contact.name}</h4>
                      <span className="text-xs text-white/40">{contact.time}</span>
                    </div>
                    <p className="text-sm text-white/50 truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-xs text-white">
                      {contact.unread}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="col-span-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 flex flex-col overflow-hidden">
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                  <Music className="w-5 h-5 text-emerald-300" />
                </div>
                {selectedContact.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
                )}
              </div>
              <div>
                <h3 className="text-white/90">{selectedContact.name}</h3>
                <p className="text-xs text-white/40">
                  {selectedContact.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.isOwn
                        ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-white/90"
                        : "bg-white/5 border border-white/10 text-white/80"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-white/40 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-500/30"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
