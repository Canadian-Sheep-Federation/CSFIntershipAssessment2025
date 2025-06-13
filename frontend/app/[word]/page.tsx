'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'next/navigation';

interface Sentence {
  id: string;
  text: string;
}

interface WordData {
  id: string;
  word: string;
  definition: string;
  partOfSpeech: string;
  sentences: Sentence[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function WordPage() {
  const params = useParams();
  const wordParam = typeof params.word === 'string' ? decodeURIComponent(params.word) : '';

  const [wordData, setWordData] = useState<WordData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSentence, setNewSentence] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!wordParam) {
      setIsLoading(false);
      setError("No word specified.");
      return;
    }

    const fetchWordData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/word?word=${encodeURIComponent(wordParam)}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Word "${wordParam}" not found. You might need to search it first to add it to the dictionary.`);
          }
          throw new Error(`Failed to fetch word data. Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        console.log(data.result);
        setWordData(data.result);
      } catch (err) {
        console.log(err)
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWordData();
  }, [wordParam]);

  const handleAddSentence = async (event: FormEvent) => {
    event.preventDefault();
    if (!newSentence.trim() || !wordData) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/sentence/${wordData.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newSentence.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to add sentence. Status: ${response.status}`);
      }

      const addedSentence = await response.json();
      
      // Refetch word data to get the updated sentence list or update locally
      setWordData(prevData => {
        if (!prevData) return null;
        // Check if sentence already exists to prevent duplicates if API returns the full word object
        const sentenceExists = prevData.sentences.some(s => s.id === addedSentence.result.id);
        return {
          ...prevData,
          sentences: sentenceExists ? prevData.sentences : [...prevData.sentences, addedSentence.result],
        };
      });
      setNewSentence('');

    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred while adding the sentence.");
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12 text-slate-400 text-lg">Loading word details...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-400 bg-red-900/20 p-6 rounded-lg shadow-md">Error: {error}</div>;
  }

  if (!wordData) {
    return <div className="text-center py-12 text-slate-400">No data found for this word.</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400 mb-2">{wordData.word}</h1>
        <p className="text-xl text-slate-400 italic mb-4">{wordData.partOfSpeech}</p>
        <p className="text-slate-300 text-lg leading-relaxed">{wordData.definition}</p>
      </div>

      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-6 text-sky-300">Example Sentences</h2>
        {wordData.sentences && wordData.sentences.length > 0 ? (
          <ul className="space-y-4">
            {wordData.sentences.map((sentence) => (
              <li key={sentence.id} className="text-slate-300 bg-slate-700/50 p-4 rounded-lg border-l-4 border-sky-500">
                {sentence.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">No example sentences yet. Be the first to add one!</p>
        )}
      </div>

      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold mb-6 text-sky-300">Add an Example Sentence</h2>
        <form onSubmit={handleAddSentence} className="space-y-5">
          <div>
            <label htmlFor="new-sentence" className="sr-only">Example sentence for "{wordData.word}"</label>
            <textarea
              id="new-sentence"
              value={newSentence}
              onChange={(e) => setNewSentence(e.target.value)}
              placeholder={`e.g., The quick brown fox jumps over the lazy ${wordData.word}.`}
              rows={4}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !newSentence.trim()}
            className="w-full sm:w-auto px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            {isSubmitting ? 'Adding...' : 'Add Sentence'}
          </button>
        </form>
      </div>
    </div>
  );
}
