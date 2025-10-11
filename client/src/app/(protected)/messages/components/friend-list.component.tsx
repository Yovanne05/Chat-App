"use client";

import { useCallback, useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import type { UserModel } from "@/models/user.model";
import { useAuth } from "@/context/AuthContext";
import { UserService } from "@/services/user.service";
import { FriendRequestService } from "@/services/friend-request.service";
import type { FriendRequestModel } from "@/models/friend-request.model";
import FriendCardComponent from "./friend-card.component";
import SearchUser from "./search-user.component";

export default function FriendListComponent() {
  const { user } = useAuth();
  const [friends, setFriends] = useState<UserModel[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequestModel[]>(
    []
  );
  const [outgoingRequests, setOutgoingRequests] = useState<FriendRequestModel[]>(
    []
  );
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(
    null
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((value) => value + 1);
  }, []);

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
  }, [user?.id, refreshKey]);

  useEffect(() => {
    if (!user?.id) return;

    let mounted = true;
    setRequestsLoading(true);

    FriendRequestService.getPending(user.id)
      .then(({ incoming, outgoing }) => {
        if (!mounted) return;
        setIncomingRequests(incoming);
        setOutgoingRequests(outgoing);
      })
      .catch((error) => {
        console.error(error);
        if (!mounted) return;
        setIncomingRequests([]);
        setOutgoingRequests([]);
      })
      .finally(() => {
        if (mounted) {
          setRequestsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [user?.id, refreshKey]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      setProcessingRequestId(requestId);
      await FriendRequestService.accept(requestId);
      triggerRefresh();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingRequestId(null);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      setProcessingRequestId(requestId);
      await FriendRequestService.reject(requestId);
      triggerRefresh();
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingRequestId(null);
    }
  };

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
          <SearchUser onFriendshipChange={triggerRefresh} />
        </div>

        <div className="mt-5 space-y-4">
          {requestsLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
              Chargement des invitations...
            </div>
          ) : (
            <>
              {incomingRequests.length > 0 && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-950/20 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    Invitations reçues
                  </p>
                  <ul className="mt-3 space-y-3">
                    {incomingRequests.map((request) => (
                      <li
                        key={request.id}
                        className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {request.requester.username}
                          </p>
                          <p className="text-xs text-emerald-100/80">
                            {request.requester.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            disabled={processingRequestId === request.id}
                            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-200 
                              ${
                                processingRequestId === request.id
                                  ? "opacity-60 cursor-not-allowed"
                                  : "hover:scale-[1.03]"
                              } 
                              bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow shadow-emerald-900/30`}
                          >
                            {processingRequestId === request.id
                              ? "..."
                              : "Accepter"}
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            disabled={processingRequestId === request.id}
                            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-200 
                              ${
                                processingRequestId === request.id
                                  ? "opacity-60 cursor-not-allowed"
                                  : "hover:scale-[1.03]"
                              } 
                              bg-slate-800/70 text-slate-200 shadow shadow-slate-900/30`}
                          >
                            {processingRequestId === request.id ? "..." : "Refuser"}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {outgoingRequests.length > 0 && (
                <div className="rounded-2xl border border-indigo-400/20 bg-indigo-950/20 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
                    Invitations envoyées
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-indigo-100/80">
                    {outgoingRequests.map((request) => (
                      <li key={request.id} className="rounded-lg bg-white/5 px-3 py-2">
                        {request.recipient.username} (en attente)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
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
