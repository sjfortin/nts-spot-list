import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { access_token, user_id, playlist_name } = await request.json();

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlist_name,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API returned status ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create playlist" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
