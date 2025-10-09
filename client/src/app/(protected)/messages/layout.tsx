import FriendListComponent from "./components/friend-list.component";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 w-full gap-6">
      <FriendListComponent />
      <div className="flex min-h-0 flex-1">
        {children}
      </div>
    </div>
  );
}
