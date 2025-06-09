"use client";

import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function NBASeasons() {
  const [seasons, setSeasons] = useState<string[]>([]);

  const fetchNBASeasons = async () => {
    if (!API_KEY || !API_HOST) {
      console.error("API key or host is not defined");
      console.log(API_HOST, API_KEY);
      return;
    }

    const res = await fetch(`https://${API_HOST}/seasons/`, {
      headers: {
        "X-Rapidapi-Key": API_KEY,
        "X-Rapidapi-Host": API_HOST,
        "Host": API_HOST,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchNBASeasons()
      .then((data) => {
        setSeasons(data.response || []);
      })
      .catch((error) => {
        console.error("Error fetching NBA Seasons data:", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-700 to-blue-400 p-8">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-6 text-center drop-shadow-lg">
          🏀 NBA Seasons
        </h1>
        <p className="mb-8 text-lg text-gray-700 text-center">
          Browse all NBA seasons available in the database.
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {seasons.map((season) => (
            <li
              key={season}
              className="bg-indigo-100 text-indigo-800 rounded-lg px-4 py-2 text-center font-semibold shadow hover:bg-indigo-200 transition"
            >
              {season}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}