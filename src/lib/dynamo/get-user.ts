import { DynamoDB } from "aws-sdk";
import { Resource } from "sst";

const dynamoDb = new DynamoDB.DocumentClient();

export async function getUserById(userId: string) {
  const params = {
    TableName: Resource.NTSSpotListTable.name,
    Key: {
      userId,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      console.log("User found:", result.Item);
      return result.Item;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Could not retrieve user from DynamoDB");
  }
}
