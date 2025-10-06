import FriendListComponent from "./components/friend-list.component";
import SearchUser from "./components/search-user.component";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-primary w-1/10 flex flex-col border-l border-gray-300">
        <div className="p-4">
          <SearchUser />
        </div>

        <div className="flex-1 overflow-y-auto">
          <FriendListComponent />
        </div>
      </div>

      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
