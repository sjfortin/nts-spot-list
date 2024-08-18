import { saveSpotifyUserData } from "@/lib/dynamo/save-spotify-user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.redirect(
      `http://localhost:3000?${new URLSearchParams({
        error: "state_mismatch",
      }).toString()}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `http://localhost:3000?${new URLSearchParams({
        error: "missing_code",
      }).toString()}`
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = "http://localhost:3000/api/spotify/callback";

  try {
    const params = new URLSearchParams({
      code,
      redirect_uri,
      grant_type: "authorization_code",
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      body: params.toString(),
    });

    const responseData = await response.json();

    const { access_token, refresh_token, expires_in } = responseData;

    const userProfileResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userProfile = await userProfileResponse.json();

    if (userProfile.error) {
      return NextResponse.json({ error: userProfile.error }, { status: 400 });
    }

    const spotifyUserId = userProfile.id;

    await saveSpotifyUserData({
      spotifyUserId,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresIn: expires_in,
      spotifyProfile: userProfile,
    });

    return NextResponse.redirect(`http://localhost:3000`);
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.redirect(
      "/?" + new URLSearchParams({ error: "invalid_token" }).toString()
    );
  }
}
