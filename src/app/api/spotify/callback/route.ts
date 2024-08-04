import { NextRequest, NextResponse } from "next/server";
// import { DynamoDB } from "aws-sdk";
// import { v4 as uuidv4 } from "uuid";
// import cookie from "cookie";

// const dynamoDb = new DynamoDB.DocumentClient();

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
      code: code,
      redirect_uri: redirect_uri,
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

    console.log("this is the response data", responseData);

    const { access_token, refresh_token, expires_in } = responseData;

    return NextResponse.redirect(
      `http://localhost:3000`
    );

    // const sessionId = uuidv4();

    // await dynamoDb
    //   .put({
    //     TableName: process.env.DYNAMODB_TABLE_NAME,
    //     Item: {
    //       userId: sessionId,
    //       accessToken: access_token,
    //       refreshToken: refresh_token,
    //       expiresIn: expires_in,
    //       createdAt: new Date().toISOString(),
    //     },
    //   })
    //   .promise();

    // Set a cookie with the session ID
    // const responseHeaders = {
    //   "Set-Cookie": cookie.serialize("sessionId", sessionId, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 60 * 60 * 24 * 7, // 1 week
    //     path: "/",
    //   }),
    // };

    // return new NextResponse(null, {
    //   headers: responseHeaders,
    //   status: 302,
    //   statusText: "Found",
    //   url: "http://localhost:3000/",
    // });
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.redirect(
      "/?" + new URLSearchParams({ error: "invalid_token" }).toString()
    );
  }
}
