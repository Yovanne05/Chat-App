"use client";

import { useState, useEffect, useCallback } from "react";
import { LuLoaderCircle, LuLoader, LuSearch, LuX } from "react-icons/lu";
import { UserService } from "@/services/user.service";
import { UserModel } from "@/models/user.model";
import UserProfil from "@/components/user-profil.component";

interface SearchUserProps {
  onFriendshipChange?: () => void;
}

export default function SearchUser({ onFriendshipChange }: SearchUserProps) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { users } = await UserService.findMany({
        username: query,
        limit: 10,
      });

      setUsers(users);
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer les utilisateurs.");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const timeout = setTimeout(() => {
        handleSearch();
      }, 400);
      return () => clearTimeout(timeout);
    }

    setUsers([]);
    setError(null);
  }, [query, handleSearch]);

  return (
    <div className="relative w-full">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        Rechercher un contact
      </p>

      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white shadow-inner shadow-slate-950/40 focus-within:border-indigo-400/40 focus-within:ring-2 focus-within:ring-indigo-400/30">
        <LuSearch className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nom d'utilisateur..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
        {isLoading && <LuLoader className="h-4 w-4 animate-spin text-indigo-300" />}
      </div>

      {query && (
        <div className="absolute left-0 right-0 z-20 mt-3 max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/85 backdrop-blur-xl shadow-xl shadow-indigo-500/20">
          {error && (
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 text-xs text-rose-300">
              <LuLoaderCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {!error && (
            <ul className="divide-y divide-white/5">
              {isLoading ? (
                <li className="px-4 py-3 text-xs text-slate-300">
                  Recherche en cours...
                </li>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="cursor-pointer px-4 py-3 text-sm text-slate-200 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                  >
                    <span className="block font-semibold text-white">
                      {user.username}
                    </span>
                    <span className="block text-xs text-slate-400">
                      {user.email}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-xs text-slate-400">
                  Aucun utilisateur trouvé.
                </li>
              )}
            </ul>
          )}
        </div>
      )}

      {/*Popup du profil utilisateur */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-md">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute -top-3 -right-3 rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <LuX className="h-4 w-4" />
            </button>
            <UserProfil
              user={selectedUser}
              onFriendshipChange={onFriendshipChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
