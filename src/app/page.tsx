import { auth, currentUser } from "@clerk/nextjs/server";
import { CreatePlaylist } from "@/components/CreatePlayList";
import { saveClerkAuthData } from "@/lib/clerk/save-clerk-auth-data";
import { queryClerkAuthData } from "@/lib/clerk/query-clerk-auth-data";

export default async function Home({ accessToken }: any) {
  const { userId } = auth();

  if (userId) {
    const user = await currentUser();
    await saveClerkAuthData(userId, {
      id: user?.id,
    });

    // const clerkAuthData = await queryClerkAuthData(userId);
    // console.log(clerkAuthData);
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <h1 className="text-2xl mb-2">NTS Spot List</h1>
        {user && user.fullName}

        <CreatePlaylist />
      </div>
    </main>
  );
}
