import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

// TODO: Seeing AccessDeniedException error when trying to save data to DynamoDB. Need to figure out permissions

export async function saveClerkAuthData(userId: string, clerkData: any) {
  console.log("Saving Clerk auth data");
  const params = {
    TableName: "NTSSpotListTable",
    Item: {
      userId,
      clerkUserId: clerkData.id,
      clerkSessionId: clerkData.sessionId,
      clerkToken: clerkData.token,
      // Add other fields as necessary
    },
  };

  try {
    await dynamoDb.put(params).promise();
    console.log("Clerk auth data saved successfully");
  } catch (error) {
    console.error("Error saving Clerk auth data:", error);
  }
}
