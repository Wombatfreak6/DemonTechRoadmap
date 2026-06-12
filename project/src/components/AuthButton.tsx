"use client";

import { useState, useEffect } from "react";
import { auth, loginWithGithub, logout, syncProgressToCloud, getCloudProgress } from "@/src/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isMocked, setIsMocked] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          // Sync local progress to cloud or fetch cloud progress
          const cloudProgress = await getCloudProgress(currentUser.uid);
          if (cloudProgress) {
            // Merge with local progress (simplistic merge)
            for (const [key, value] of Object.entries(cloudProgress)) {
              const localVal = window.localStorage.getItem(key);
              if (!localVal) {
                window.localStorage.setItem(key, JSON.stringify(value));
              }
            }
          }
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await loginWithGithub();
      if (!auth) {
        setIsMocked(true); // Mock user for demo if Firebase is not configured
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsMocked(false);
  };

  if (!isClient) return <div className="w-[120px] h-9" />; // Placeholder

  const loggedIn = user || isMocked;
  const displayName = user?.displayName || (isMocked ? "Mock User" : "");

  return (
    <div className="flex items-center gap-4">
      {loggedIn ? (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-300 hidden md:inline">
            Hi, {displayName}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-md border border-zinc-700 bg-transparent px-4 py-2 text-sm font-black text-white transition hover:border-zinc-500"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="rounded-md border border-zinc-700 bg-black/35 px-4 py-2 text-sm font-black text-white transition hover:border-zinc-500 flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          Sign In
        </button>
      )}
    </div>
  );
}
