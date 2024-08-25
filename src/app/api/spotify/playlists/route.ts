import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/dynamo/get-user";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await getUserById(user.id);
    if (!userData || !userData.accessToken) {
      return NextResponse.json(
        { error: "Spotify access token not found" },
        { status: 404 }
      );
    }

    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${userData.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API returned status ${response.status}`);
    }

    const data = await response.json();
    const playlists = data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    return NextResponse.json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
