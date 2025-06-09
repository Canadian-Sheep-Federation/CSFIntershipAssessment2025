"use client";

export default function NBASeasons() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-700 to-blue-400 p-8">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-6 text-center drop-shadow-lg">
          🏆 NBA Conferences
        </h1>
        <p className="mb-8 text-lg text-gray-700 text-center">
          Choose a conference to explore teams, reviews, and more!
        </p>
        <div className="flex gap-6">
          <a
            href="/eastConference"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-xl"
          >
            East Conference
          </a>
          <a
            href="/westConference"
            className="px-8 py-4 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition text-xl"
          >
            West Conference
          </a>
        </div>
      </div>
    </main>
  );
}