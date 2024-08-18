import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const client_id = "a5586e5ee02649f9af72003acb9c1ec4";
  const redirect_uri = `http://localhost:3000/api/spotify/callback`;

  const state = generateRandomString(16);

  const scope = "playlist-modify-public playlist-modify-private";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  return redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}

function generateRandomString(length: number) {
  let text = "";

  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
