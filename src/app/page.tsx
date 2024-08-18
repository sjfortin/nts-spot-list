import { auth, currentUser } from "@clerk/nextjs/server";
import { CreatePlaylist } from "@/components/CreatePlayList";
import { saveClerkAuthData } from "@/lib/dynamo/save-clerk-auth";
import { getUserById } from "@/lib/dynamo/get-user";
import SpotifyLogin from "@/components/SpotifyLogin";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();

  if (userId) {
    const existingUserData = await getUserById(userId);
    if (!existingUserData) {
      const currentClerkUser = await currentUser();
      await saveClerkAuthData(userId, {
        id: currentClerkUser?.id,
      });
    }
  }

  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <h1 className="text-2xl mb-2">NTS Spot List</h1>
        {user ? (
          <div>{user.fullName}</div>
        ) : (
          <div>
            <Link href="/sign-in">Sign In</Link>
          </div>
        )}

        {user && <SpotifyLogin />}

        {user && <CreatePlaylist />}
      </div>
    </main>
  );
}
