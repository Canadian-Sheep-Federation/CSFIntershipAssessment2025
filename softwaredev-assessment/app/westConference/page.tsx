'use client';

import { useEffect, useState } from "react";
import { Team } from "../models";
import Link from "next/link";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function WestConference() {
  const [westTeams, setWestTeams] = useState<Team[]>([]);
  
  
    const fetchWestConTeams = async () => {
      // Check if API_KEY and API_HOST are defined
      // If not, log an error and return early
      if (!API_KEY || !API_HOST) {
        console.error("API key or host is not defined");
        console.log(API_HOST, API_KEY);
        return;
      }


      // Fetch teams from the public API for the Western Conference
      // Use the API_KEY and API_HOST from environment variables
      const res = await fetch(`https://${API_HOST}/teams/?conference=west`, {
          //Use parameters to fetch teams of each conference
          method: "GET",
        headers: {
          "X-Rapidapi-Key": API_KEY,
          "X-Rapidapi-Host": API_HOST,
          "Host": API_HOST,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      //
  
      const data = await res.json();
      console.log(data);
      return data;
    };
  
    useEffect(() => {
      // Fetch data from the public API
      fetchWestConTeams()
        .then((data) => {
          setWestTeams(data.response || []);
        })
        .catch((error) => {
          console.error("Error fetching NBA Teams data:", error);
        });
    }, []);
  
    return (
      <div>
        <h1>NBA East Conference Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {westTeams
        .map((p) => (
            <div
                key={String(p.id)}
                className="bg-white text-black rounded shadow p-4 flex flex-col items-start"
                >
                <h2 className="text-lg font-bold mb-2">{p.name}</h2>
                <p className="mb-1">
                    <span className="font-semibold">City:</span> {p.city}
                </p>
                <p className="mb-1">
                    <span className="font-semibold">Code:</span> {p.code}
                </p>
                <p className="mb-4">
                    <span className="font-semibold">Nickname:</span> {p.nickname}
                </p>
                <img src={p.logo} alt={`${p.name} logo`} className="w-24 h-24 mb-4" />
                {/* Add a button to review or comment on the team */}
                <div className="flex gap-2">
                    <Link href={`/eastConference/${p.id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                        Review / Comments
                        </button>
                    </Link>
                </div>
            </div>
      ))}
    </div>
      </div>
    );
}