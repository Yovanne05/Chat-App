import { useState, KeyboardEvent } from "react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    isConnected: boolean;
}

export const MessageInput = ({ onSendMessage, isConnected }: MessageInputProps) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage("");
        }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isConnected ? "Tapez votre message..." : "Connexion en cours..."}
                    className="flex-1 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isConnected}
                />
                <button
                    onClick={handleSend}
                    disabled={!newMessage.trim() || !isConnected}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};