import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">
          NBA Review App
        </a>
        <div>
          <a href="/nbaseasons" className="text-white mr-4">
            NBA Seasons
          </a>
          <a href="/nbateams" className="text-white mr-4">
            NBA Teams
          </a>
          <a href="/reviews" className="text-white">
            Reviews
          </a>
        </div>
      </div>
    </nav>
  );
}