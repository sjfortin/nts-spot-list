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
    if (!userData || !userData.spotifyProfile) {
      return NextResponse.json(
        { error: "Spotify profile not found" },
        { status: 404 }
      );
    }

    const spotifyProfile = JSON.parse(userData.spotifyProfile);
    return NextResponse.json({ spotifyProfile });
  } catch (error) {
    console.error("Error fetching Spotify profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
