/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "nts-spot-list",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("NTSSpotListTable", {
      fields: {
        userId: "string",
        clerkUserId: "string",
        clerkSessionId: "string",
        clerkToken: "string",
        spotifyUserId: "string",
        accessToken: "string",
        refreshToken: "string",
        spotifyData: "string", // Store additional map data as a JSON string
      },
      primaryIndex: { hashKey: "userId" },
      globalIndexes: {
        ClerkUserIdIndex: { hashKey: "clerkUserId" },
        ClerkSessionIdIndex: { hashKey: "clerkSessionId" },
        ClerkTokenIndex: { hashKey: "clerkToken" },
        SpotifyUserIdIndex: { hashKey: "spotifyUserId" },
        AccessTokenIndex: { hashKey: "accessToken" },
        RefreshTokenIndex: { hashKey: "refreshToken" },
        SpotifyDataIndex: { hashKey: "spotifyData" },
      },
    });

    new sst.aws.Nextjs("NTSSpotList", {
      link: [table],
    });
  },
});
