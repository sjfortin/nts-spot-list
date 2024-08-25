import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { currentUser } from "@clerk/nextjs/server";
import { Resource } from "sst";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function saveSpotifyUserData(spotifyData: any) {
  const currentClerkUser = await currentUser();

  const command = new UpdateCommand({
    TableName: Resource.NTSSpotListTable.name,
    Key: {
      userId: currentClerkUser?.id,
    },
    UpdateExpression:
      "set accessToken = :accessToken, refreshToken = :refreshToken, expiresIn = :expiresIn, spotifyProfile = :spotifyProfile, spotifyUserId = :spotifyUserId",
    ExpressionAttributeValues: {
      ":accessToken": spotifyData.accessToken,
      ":refreshToken": spotifyData.refreshToken,
      ":spotifyUserId": spotifyData.spotifyUserId,
      ":expiresIn": spotifyData.expiresIn,
      ":spotifyProfile": JSON.stringify(spotifyData.spotifyProfile), // Save Spotify user profile as JSON string
    },
    ReturnValues: "UPDATED_NEW",
  });

  try {
    const response = await docClient.send(command);
  } catch (error) {
    console.error("Error updating spotify data:", error);
  }
}
