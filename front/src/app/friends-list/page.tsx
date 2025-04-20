import Link from 'next/link'
import FriendCard from "@/app/friends-list/components/friend-card";

export default function Page2() {
    return (
        <div>
            <FriendCard />
            <Link href="/">Retour</Link>
        </div>
    );
}
