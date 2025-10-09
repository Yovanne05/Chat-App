"use client";

import { useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { MessageDTO } from "@/dto/message.dto";
import { useConversation } from "@/hooks/useConversation";
import { useMessages } from "@/hooks/useMessage";
import { useWebSocket } from "@/hooks/useWebSocket";
import { LoadingSpinner } from "./components/loading-spinner.component";
import { MessageHeader } from "./components/message-header.component";
import { MessageInput } from "./components/message-input.component";
import { MessageList } from "./components/message-list.component";

export default function ConversationPage() {
  const params = useParams();
  const friendId = params.id as string;

  const {
    friend,
    currentUser,
    isLoading: isConversationLoading,
    error: conversationError,
  } = useConversation(friendId);

  const {
    messages,
    isLoading: isMessagesLoading,
    loadMessages,
    addMessage,
    addOptimisticMessage,
  } = useMessages(currentUser?.id || null, friendId);

  const handleMessageReceived = useCallback(
    (message: MessageDTO) => {
      addMessage(message);
    },
    [addMessage],
  );

  const { sendMessage, joinConversation, isConnected } = useWebSocket({
    userId: currentUser?.id || null,
    onMessageReceived: handleMessageReceived,
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    if (currentUser) {
      loadMessages();
    }
  }, [currentUser, loadMessages]);

  useEffect(() => {
    if (isConnected && currentUser && friendId) {
      joinConversation(friendId);
    }
  }, [isConnected, currentUser, friendId, joinConversation]);

  const handleSendMessage = (content: string) => {
    if (!currentUser || !isConnected) {
      console.error("Impossible d'envoyer: utilisateur ou connexion manquante");
      return;
    }

    addOptimisticMessage({
      sender: currentUser.id,
      receiver: friendId,
      message: content,
    });
    sendMessage(friendId, content);
  };

  if (isConversationLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <LoadingSpinner />
      </div>
    );
  }

  if (conversationError || !friend) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <p className="text-sm text-slate-300">
          {conversationError || "Ami introuvable"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-[0_40px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-2xl">
      <MessageHeader friend={friend} isConnected={isConnected} />

      <div className="relative flex-1 overflow-hidden">
        {isMessagesLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <MessageList messages={messages} currentUser={currentUser} />
        )}
      </div>

      <MessageInput onSendMessage={handleSendMessage} isConnected={isConnected} />
    </div>
  );
}
