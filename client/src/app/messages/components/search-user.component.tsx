"use client";

import { useState, useEffect } from "react";
import { UserService } from "@/services/user.service";
import { UserModel } from "@/models/user.model";

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
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
      setError("Error while searching users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      const timeout = setTimeout(() => {
        handleSearch();
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      setUsers([]);
    }
  }, [query]);

  return (
    <div className="w-full p-2">
      <input
        type="text"
        placeholder="Search user..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full p-2 text-sm rounded-lg 
          bg-gray-800 border border-gray-700 text-gray-200 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      />

      {/* Résultats */}
      {query && (
        <div className="mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isLoading && (
            <p className="text-gray-400 text-sm p-2">Searching...</p>
          )}

          {error && (
            <p className="text-red-400 text-sm p-2">{error}</p>
          )}

          {!isLoading && users.length > 0 && (
            <ul className="divide-y divide-gray-700">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="p-2 hover:bg-gray-800 cursor-pointer transition-colors"
                >
                  <span className="block text-gray-100 text-sm font-medium">
                    {user.username}
                  </span>
                  <span className="block text-gray-400 text-xs">{user.email}</span>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && query && users.length === 0 && (
            <p className="text-gray-500 text-sm p-2 text-center">
              No users found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
