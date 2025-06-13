'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-250px)] text-center">
      <h1 className="text-5xl font-extrabold mb-6">
        Discover <span className="text-red-100">Words</span>
      </h1>
      <p className="text-slate-400 mb-10 text-lg max-w-xl">
        Type a word to explore its definition, part of speech, and example sentences.
        Expand your vocabulary with ease!
      </p>
      <form onSubmit={handleSearch} className="w-full max-w-lg bg-slate-800 p-8 rounded-xl shadow-2xl">
        <label htmlFor="search-word" className="sr-only">Search word</label>
        <div className="flex items-center border-b-2 border-sky-500 py-2">
          <input
            id="search-word"
            className="appearance-none bg-transparent border-none w-full text-slate-100 placeholder-slate-500 mr-3 py-2 px-2 leading-tight focus:outline-none text-lg"
            type="text"
            placeholder="e.g., serendipity"
            aria-label="Search word"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-sky-500 hover:bg-sky-600 border-sky-500 hover:border-sky-600 text-base font-semibold border-4 text-white py-2 px-4 rounded-lg transition-colors"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
