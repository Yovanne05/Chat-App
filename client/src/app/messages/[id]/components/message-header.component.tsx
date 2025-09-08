import { UserModel } from "@/models/user.model";

interface MessageHeaderProps {
    friend: UserModel;
    isConnected: boolean;
}

export const MessageHeader = ({ friend, isConnected }: MessageHeaderProps) => {
    return (
        <div className="p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">
            {friend.username.charAt(0).toUpperCase()}
          </span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">
                        {friend.username}
                    </h1>
                    <div className={`text-xs ${isConnected ? "text-green-400" : "text-red-400"}`}>
                        {isConnected ? "En ligne" : "Hors ligne"}
                    </div>
                </div>
            </div>
        </div>
    );
};