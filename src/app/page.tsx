"use client";

import { CreatePlaylist } from "@/components/CreatePlayList";

export default function Home({ accessToken, userId }: any) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <h1 className="text-2xl mb-2">NTS Spot List</h1>
        <CreatePlaylist accessToken={accessToken} userId={userId} />
      </div>
    </main>
  );
}
