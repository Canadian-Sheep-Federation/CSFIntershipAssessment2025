export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-8">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-12 flex flex-col items-center max-w-xl w-full">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4 text-center drop-shadow-lg">
          🏀 NBA Team Review App
        </h1>
        <p className="mt-2 text-xl text-gray-700 text-center">
          Discover, review, and discuss your favorite NBA teams.<br />
          Share your thoughts and see what others are saying!
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="/seasons"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"          >
            NBA Seasons
          </a>
          <a
            href="/nbateams"
            className="px-6 py-3 bg-red-900 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
          >
            NBA Teams
          </a>
        </div>
      </div>
    </main>
  );
}