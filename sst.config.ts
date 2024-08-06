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
    new sst.aws.Nextjs("NTSSpotList", {
      link: [usersTable],
    });
  },
});

const usersTable = new sst.aws.Dynamo("Users", {
  fields: {
    userId: "string",
    spotifyAccessToken: "string",
    spotifyRefreshToken: "string",
  },
  primaryIndex: { hashKey: "userId" },
  globalIndexes: {
    SpotifyAccessTokenIndex: { hashKey: "spotifyAccessToken" },
    SpotifyRefreshTokenIndex: { hashKey: "spotifyRefreshToken" },
  },
});
