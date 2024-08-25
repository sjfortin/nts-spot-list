import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function getUserById(userId: string) {
  const params = {
    TableName: Resource.NTSSpotListTable.name,
    Key: {
      userId,
    },
  };

  try {
    const { Item } = await docClient.send(new GetCommand(params));
    if (Item) {
      return Item;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new Error("Could not retrieve user from DynamoDB");
  }
}
