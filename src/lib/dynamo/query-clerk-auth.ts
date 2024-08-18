import { Resource } from "sst";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function queryClerkAuthData(userId: string) {
  const params = {
    TableName: Resource.NTSSpotListTable.name,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  try {
    const data = await client.send(new QueryCommand(params));
    return data.Items;
  } catch (error) {
    console.error("Error querying Clerk auth data:", error);
    throw new Error("Failed to query Clerk auth data");
  }
}
