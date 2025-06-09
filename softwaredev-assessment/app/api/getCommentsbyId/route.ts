import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { TeamReviewFormProps } from "@/app/models";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_COLLECTION_TEAMS = process.env.MONGO_COLLECTION_TEAMS;

export async function GET(request: NextRequest) {
    try {
        switch (true) {
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

        const client = new MongoClient(MONGO_URI);
        await client.connect();
        const db = client.db(MONGO_DB_NAME);
        const collection = db.collection(MONGO_COLLECTION_TEAMS);

        // Filter by teamId
        const teamId = request.nextUrl.searchParams.get("teamId");

        const reviews = await collection.find({teamId}).toArray();
        await client.close();

        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}