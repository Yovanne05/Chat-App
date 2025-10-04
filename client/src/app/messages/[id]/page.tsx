"use client";

import { useParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useConversation } from "@/hooks/useConversation";
import {useMessages} from "@/hooks/useMessage";
import {MessageDTO} from "@/dto/message.dto";
import {MessageHeader} from "@/app/messages/[id]/components/message-header.component";
import {MessageList} from "@/app/messages/[id]/components/message-list.component";
import {MessageInput} from "@/app/messages/[id]/components/message-input.component";
import {LoadingSpinner} from "@/app/messages/[id]/components/loading-spinner.component";


export default function MessagePage() {
    const params = useParams();
    const friendId = params.id as string;

    const { friend, currentUser, isLoading: isConversationLoading, error: conversationError } = useConversation(friendId);
    const { messages, isLoading: isMessagesLoading, loadMessages, addMessage } = useMessages(currentUser?.id || null, friendId);

    const handleMessageReceived = useCallback((message: MessageDTO) => {
        addMessage(message);
    }, [addMessage]);

    const { sendMessage, joinConversation, isConnected } = useWebSocket({
        userId: currentUser?.id || null,
        onMessageReceived: handleMessageReceived,
        onError: (error) => console.error(error)
    });

    // Charger les messages au montage
    useEffect(() => {
        if (currentUser) {
            loadMessages();
        }
    }, [currentUser, loadMessages]);

    // Rejoindre la conversation quand le socket est connecté
    useEffect(() => {
        if (isConnected && currentUser && friendId) {
            console.log("🚀 Rejoindre la conversation avec:", friendId);
            joinConversation(friendId);
        }

        // Cleanup: quitter la conversation au démontage
        return () => {
            if (isConnected && currentUser && friendId) {
                console.log("🔚 Nettoyage: quitter la conversation");
            }
        };
    }, [isConnected, currentUser, friendId, joinConversation]);

    const handleSendMessage = (content: string) => {
        if (currentUser && isConnected) {
            sendMessage(friendId, content);
        } else {
            console.error("❌ Impossible d'envoyer: utilisateur ou connexion manquante");
        }
    };

    if (isConversationLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
            </div>
        );
    }

    if (conversationError || !friend) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white">{conversationError || "Ami non trouvé"}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-900">
            <MessageHeader friend={friend} isConnected={isConnected} />

            {isMessagesLoading ? (
                <div className="flex items-center justify-center h-full">
                    <LoadingSpinner />
                </div>
            ) : (
                <MessageList messages={messages} currentUser={currentUser} />
            )}

            <MessageInput
                onSendMessage={handleSendMessage}
                isConnected={isConnected}
            />
        </div>
    );
}