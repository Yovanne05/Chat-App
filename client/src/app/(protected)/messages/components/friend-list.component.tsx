"use client";

import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import type { UserModel } from "@/models/user.model";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import FriendCardComponent from "./friend-card.component";
import SearchUser from "./search-user.component";

export default function FriendListComponent() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<UserModel[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    let mounted = true;
    setIsLoading(true);

    UserService.findFriends(user.id)
      .then((data) => {
        if (mounted) {
          setFriends(data);
        }
      })
      .catch((error) => {
        console.error(error);
        if (mounted) {
          setFriends([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  return (
    <aside className="flex h-full min-h-0 w-full max-w-[340px] flex-col rounded-3xl border border-white/5 bg-white/5 shadow-xl shadow-indigo-500/10 backdrop-blur-xl">
      <div className="border-b border-white/5 px-6 pb-6 pt-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Mes contacts
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Amis en ligne
            </h2>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-indigo-200">
            <LuUsers className="h-5 w-5" />
          </div>
        </header>
        <div className="mt-6">
          <SearchUser />
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-6 pb-6 pt-4">
        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-2xl border border-white/5 bg-white/5"
              />
            ))}
          </div>
        ) : friends && friends.length > 0 ? (
          <ul className="flex h-full flex-col gap-4 overflow-y-auto pr-2">
            {friends.map((friend) => (
              <li key={friend.id}>
                <FriendCardComponent friend={friend} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 py-8 text-center text-sm text-slate-300">
            Aucun ami trouve pour le moment. Envoyez vos premieres invitations !
          </div>
        )}
      </div>
    </aside>
  );
}
