import { auth, currentUser } from "@clerk/nextjs/server";
import { CreatePlaylist } from "@/components/CreatePlayList";

export default async function Home({ accessToken }: any) {
  const { userId } = auth();

  // if (userId) {
  //   // Query DB for user specific information or display assets only to signed in users
  //   console.log(userId);
  // }

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
