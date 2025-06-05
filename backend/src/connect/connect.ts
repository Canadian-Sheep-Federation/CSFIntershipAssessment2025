import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { userreviews?: mongoDB.Collection } = {};

/**
 * Method responsible for connecting to the mongoDB
 * 
 */
export async function connectToDatabase() {
  dotenv.config();
  if (
    !process.env.MONGO_CONNECTION_STRING ||
    !process.env.DEMO_COLLECTION_NAME || 
    !process.env.DEMO_COLLECTION_NAME
  ) {
    console.log("ENV Mongo variables need to be set!");
    return;
  } else {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      process.env.MONGO_CONNECTION_STRING
    );

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.MONGO_DB_NAME);

    const reviewCollection: mongoDB.Collection = db.collection(
      process.env.DEMO_COLLECTION_NAME
    );

    collections.userreviews = reviewCollection;
  }
}
