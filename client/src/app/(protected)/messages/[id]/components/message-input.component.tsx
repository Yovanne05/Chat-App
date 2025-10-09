import { KeyboardEvent, useState } from "react";
import { LuPaperclip, LuSend } from "react-icons/lu";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isConnected: boolean;
}

export const MessageInput = ({ onSendMessage, isConnected }: MessageInputProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage("");
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="border-t border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 shadow-inner shadow-slate-950/40">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/5 bg-white/10 text-slate-200 transition-all duration-200 hover:bg-white/20"
          aria-label="Joindre un fichier"
        >
          <LuPaperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={
            isConnected ? "Ecrivez un message raffine..." : "Connexion au salon..."
          }
          className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          disabled={!isConnected}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!newMessage.trim() || !isConnected}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Envoyer
          <LuSend className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
};
