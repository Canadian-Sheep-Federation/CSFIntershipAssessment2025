import { ObjectId } from "mongodb";

export interface Team {
    id: string; // Unique identifier for the team
    name: string;// Name of the team
    nickname: string; // Nickname of the team
    city: string; // City where the team is based
    code: string; // Team code, e.g., "LAL" for Los Angeles Lakers
    conference: string; // Conference the team belongs to, e.g., "East" or "West"
    logo: string; // URL to the team's logo image
}

export interface TeamReviewFormProps {
    teamId: string; //For associating with Team
    username: string | undefined; //Username of the reviewer
    team: string; //For associating with Team
    rating: number; //1-5 rating
    comment: string; //User's comment about the team
    favoritePlayer: string; //User's favorite player from the team
    createdAt: string; //ISO date string
}

export interface SeasonReviewFormData {
    season: number; //For associating with Season
    rating: number;
    comment: string;
    favoriteTeam: string;
    createdAt: string;
}