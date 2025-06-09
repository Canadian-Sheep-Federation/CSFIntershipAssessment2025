"use client"

import { useEffect, useState } from "react";
import { Team, TeamReviewFormProps } from "@/app/models";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchComments } from "@/app/APIfunctions/FetchComments";
import { fetchOneTeam } from "@/app/APIfunctions/FetchOneTeam";
import { createReview } from "@/app/APIfunctions/CreateReview";
import ReviewForm from "@/app/components/ReviewForm";

export default function EastTeam() {
    const {id} = useParams();
    const [team, setTeam] = useState<Team>();
    const [comments, setComments] = useState<TeamReviewFormProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const refreshComments = () => {
        fetchComments(id as string)
            .then((data) => setComments(data || []))
            .catch((error) => console.error("Error fetching comments data:", error))
            .finally(() => setLoading(false)); // Set loading to false after fetch
    }
      
      
        useEffect(() => {
        fetchOneTeam(id as string)
            .then((data) => {
                setTeam(data.response?.[0] || null); 
            })
            .catch((error) => {
                console.error("Error fetching NBA Teams data:", error);
            });
        setLoading(true); // Set loading before fetching comments
        // Fetch comments for the team
        refreshComments();
    }, []);

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 text-black rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">NBA East Conference Team</h1>
            {team && (
                <div className="bg-white text-black rounded shadow p-4 flex flex-col items-start">
                    <h2 className="text-lg font-bold mb-2">{team.name}</h2>
                    <p className="mb-1">
                        <span className="font-semibold">City:</span> {team.city}
                    </p>
                    <p className="mb-1">
                        <span className="font-semibold">Nickname:</span> {team.nickname}
                    </p>
                    <img src={team.logo} alt={`${team.name} logo`} className="w-24 h-24 mb-4" />
                </div>
            )}
            {/* Review Form Section */}
            {team && <ReviewForm id={id as string} teamName={team.name} />}
            {/* Comments Section */}
            <h2 className="text-xl font-bold mt-6 mb-4">Comments</h2>
            <div className="space-y-4">
                {loading ? (
                    <div>Loading comments...</div>
                ) : (
                    comments
                        .slice()
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((comment) => (
                            <div key={comment.createdAt} className="bg-gray-100 p-4 rounded shadow">
                                <p>User: {comment.username}</p>
                                <p className="font-semibold">{comment.team}</p>
                                <p>Rating: {comment.rating}</p>
                                <p>{comment.comment}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}