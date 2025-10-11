"use client";

import { useEffect, useState } from "react";
import { UserModel } from "@/models/user.model";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import {
  FriendRequestService,
  FriendshipStatusModel,
} from "@/services/friend-request.service";

interface UserProfilProps {
  user: UserModel;
  onFriendshipChange?: () => void;
}

export default function UserProfil({
  user,
  onFriendshipChange,
}: UserProfilProps) {
  const { user: currentUser } = useAuth();
  const [relation, setRelation] = useState<FriendshipStatusModel>({
    status: "none",
  });
  const [relationLoading, setRelationLoading] = useState<boolean>(true);
  // TODO : Ajouter la gestion du blocage d'un utilisateur
  const [isBlocked] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!currentUser || currentUser.id === user.id) {
      setRelation({ status: "none" });
      setRelationLoading(false);
      return;
    }

    let cancelled = false;
    setRelationLoading(true);

    FriendRequestService.getStatus(currentUser.id, user.id)
      .then((status) => {
        if (!cancelled) {
          setRelation(status);
        }
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) {
          setRelation({ status: "none" });
        }
      })
      .finally(() => {
        if (!cancelled) {
          setRelationLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentUser?.id, user.id]);

  const handleSendFriendRequest = async () => {
    try {
      if (!currentUser) return;
      setActionLoading(true);
      const request = await FriendRequestService.send(
        currentUser.id,
        user.id
      );
      setRelation({ status: "outgoing", request });
      onFriendshipChange?.();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAcceptFriendRequest = async () => {
    try {
      if (relation.status !== "incoming") return;
      setActionLoading(true);
      await FriendRequestService.accept(relation.request.id);
      setRelation({ status: "friends" });
      onFriendshipChange?.();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectFriendRequest = async () => {
    try {
      if (relation.status !== "incoming") return;
      setActionLoading(true);
      await FriendRequestService.reject(relation.request.id);
      setRelation({ status: "none" });
      onFriendshipChange?.();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      if (!currentUser) return;
      setActionLoading(true);
      await UserService.removeFriend(currentUser.id, user.id);
      setRelation({ status: "none" });
      onFriendshipChange?.();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlockUser = async () => {
    // try {
    //   setActionLoading(true);
    //   await UserService.blockUser(user.id);
    //   setIsBlocked(true);
    //   setRelation({ status: "none" });
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setActionLoading(false);
    // }
  };

  const renderActions = () => {
    if (isBlocked) {
      return (
        <span className="text-rose-400 text-sm font-medium bg-rose-950/30 px-4 py-2 rounded-xl border border-rose-500/30">
          User blocked
        </span>
      );
    }

    if (relationLoading) {
      return (
        <button
          disabled
          className="rounded-xl px-5 py-2.5 text-sm font-semibold opacity-60 cursor-not-allowed bg-slate-800/70 text-gray-300"
        >
          Chargement...
        </button>
      );
    }

    switch (relation.status) {
      case "friends":
        return (
          <button
            disabled={actionLoading}
            onClick={handleRemoveFriend}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 
            ${actionLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.03]"} 
            bg-gradient-to-tr from-red-600 via-red-500 to-rose-500 text-white 
            shadow-md shadow-red-900/30 hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/40`}
          >
            {actionLoading ? "..." : "Retirer des amis"}
          </button>
        );
      case "incoming":
        return (
          <div className="flex gap-3">
            <button
              disabled={actionLoading}
              onClick={handleAcceptFriendRequest}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 
              ${actionLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.03]"} 
              bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 text-white 
              shadow-md shadow-emerald-900/30 hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/40`}
            >
              {actionLoading ? "..." : "Accepter"}
            </button>
            <button
              disabled={actionLoading}
              onClick={handleRejectFriendRequest}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 
              ${actionLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.03]"} 
              bg-slate-800/70 hover:bg-slate-700/70 text-gray-300 
              shadow-md shadow-slate-900/40 hover:shadow-slate-600/30 focus:outline-none focus:ring-2 focus:ring-slate-500/40`}
            >
              {actionLoading ? "..." : "Refuser"}
            </button>
          </div>
        );
      case "outgoing":
        return (
          <button
            disabled
            className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white opacity-70 cursor-not-allowed"
          >
            Invitation envoyée
          </button>
        );
      case "none":
      default:
        return (
          <button
            disabled={actionLoading}
            onClick={handleSendFriendRequest}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 
            ${actionLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.03]"} 
            bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white 
            shadow-md shadow-indigo-900/30 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400/40`}
          >
            {actionLoading ? "..." : "Ajouter en ami"}
          </button>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-10 py-8 text-center shadow-xl shadow-indigo-500/10 backdrop-blur-xl">
      <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px]">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-4xl font-bold text-white">
          {user.username ? user.username[0]?.toUpperCase() : "?"}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">{user.username}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>

      <div className="flex gap-3 mt-4">
        {renderActions()}

        {!isBlocked && relation.status !== "incoming" && (
          <button
            disabled={actionLoading}
            onClick={handleBlockUser}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 
            ${actionLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.03]"} 
            bg-slate-800/70 hover:bg-slate-700/70 text-gray-300 
            shadow-md shadow-slate-900/40 hover:shadow-slate-600/30 focus:outline-none focus:ring-2 focus:ring-slate-500/40`}
          >
            Block
          </button>
        )}
      </div>
    </div>
  );
}
