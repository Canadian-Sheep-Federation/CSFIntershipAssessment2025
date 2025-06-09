import { NextRequest, NextResponse } from "next/server";
//Post a review to MongoDB
import { MongoClient} from "mongodb";
import { TeamReviewFormProps } from "@/app/models";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_COLLECTION_TEAMS = process.env.MONGO_COLLECTION_TEAMS;

export async function POST(request: NextRequest) {
    try {
        switch ( true ) {
            case !MONGO_URI:
                return NextResponse.json(
                    { error: "MONGO_URI is not defined" },
                    { status: 500 }
                );
            case !MONGO_DB_NAME:
                return NextResponse.json(
                    { error: "MONGO_DB_NAME is not defined" },
                    { status: 500 }
                );
            case !MONGO_COLLECTION_TEAMS:
                return NextResponse.json(
                    { error: "MONGO_COLLECTION_TEAMS is not defined" },
                    { status: 500 }
                );
        }
        const body = await request.json();

        const { username, team, teamId, rating, comment, favoritePlayer, createdAt } = body as TeamReviewFormProps;
        if (!username || !team || !teamId || !rating || !comment || !favoritePlayer || !createdAt) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }
        
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(MONGO_DB_NAME); // Replace with your database name
        const collection = db.collection(MONGO_COLLECTION_TEAMS); // Replace with your collection name
        const newReview: TeamReviewFormProps = {
            username, // Username of the reviewer
            teamId,
            team,
            rating,
            comment,
            favoritePlayer,
            createdAt: new Date().toISOString(),
        };
        const result = await collection.insertOne(newReview);
        await client.close();
        console.log("Review created with ID:", result);
        return NextResponse.json(
            { message: "Review created successfully", reviewId: result.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json(
            { error: "Failed to create review" },
            { status: 500 }
        );
    }
}