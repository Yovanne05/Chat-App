import FriendListComponent from "./components/friend-list.component";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full">
            <div className="bg-primary w-1/10 flex justify-center border-l border-gray-300">
                <FriendListComponent />
            </div>

            <div className="flex-1 p-4">
                {children}
            </div>
        </div>
    );
}