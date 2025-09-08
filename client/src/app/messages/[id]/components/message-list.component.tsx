import { MessageDTO } from "@/dto/message.dto";
import { UserModel } from "@/models/user.model";
import {useEffect, useRef} from "react";
import {formatMessageTime} from "@/utils/dateFormatter";

interface MessageListProps {
    messages: MessageDTO[];
    currentUser: UserModel | null;
}

export const MessageList = ({ messages, currentUser }: MessageListProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-center">
                    Aucun message. Envoyez le premier message pour commencer la conversation !
                </p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.sender === currentUser?.id ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`max-w-xs p-3 rounded-lg ${
                            message.sender === currentUser?.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-white"
                        }`}
                    >
                        <p className="text-sm break-words">{message.message}</p>
                        <span className="text-xs opacity-70 block mt-1">
              {formatMessageTime(message.createdAt)}
            </span>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};