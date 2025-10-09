import { useEffect, useRef } from "react";
import { MessageDTO } from "@/dto/message.dto";
import { UserModel } from "@/models/user.model";
import { formatMessageTime } from "@/utils/date-formatter";

interface MessageListProps {
  messages: MessageDTO[];
  currentUser: UserModel | null;
}

export const MessageList = ({ messages, currentUser }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-gradient-to-b from-slate-950/20 via-slate-900/20 to-slate-950/35 px-8 py-10">
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 px-8 py-12 text-center text-sm text-slate-300">
          Aucun message pour le moment. Envoyez une premiere note pour lancer la conversation !
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gradient-to-b from-slate-950/20 via-slate-900/15 to-slate-950/35 px-6 py-10">
      <div className="flex flex-1 flex-col gap-4">
        {messages.map((message) => {
          const isOwn = message.sender === currentUser?.id;

          return (
            <div
              key={message.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-md rounded-3xl border px-5 py-4 text-sm leading-relaxed shadow-lg transition-all duration-200 ${
                  isOwn
                    ? "border-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white shadow-indigo-500/30"
                    : "border-white/5 bg-white/10 text-slate-100 shadow-slate-900/20"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.message}</p>
                <span
                  className={`mt-3 block text-[11px] uppercase tracking-wide ${
                    isOwn ? "text-white/70" : "text-slate-300/80"
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
