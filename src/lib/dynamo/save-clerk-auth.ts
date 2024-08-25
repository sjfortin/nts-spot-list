import { DynamoDB } from "aws-sdk";
import { Resource } from "sst";

const dynamoDb = new DynamoDB.DocumentClient();

export async function saveClerkAuthData(userId: string, clerkData: any) {
  const params = {
    TableName: Resource.NTSSpotListTable.name,
    Item: {
      userId,
      clerkUserId: clerkData.id,
    },
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (error) {
    console.error("Error saving Clerk auth data:", error);
  }
}
