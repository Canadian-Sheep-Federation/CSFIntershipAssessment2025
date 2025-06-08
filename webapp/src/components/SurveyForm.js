import { useState } from 'react';
import axios from 'axios';

export default function SurveyForm({ favoritePokemon, onSubmitted }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const submit = async () => {
    if (!name || !favoritePokemon || !comment) {
      setError('All fields are required');
      return;
    }
    try {
      setError('');
      await axios.post('http://localhost:3000/responses', {
        name,
        favoritePokemon,
        comment
      });
      onSubmitted();
      setName('');
      setComment('');
    } catch {
      setError('Submit failed');
    }
  };

  return (
    <div>
      <h3>Survey</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name"
      />
      <input
        value={favoritePokemon}
        disabled
        placeholder="Favorite Pokémon"
      />
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Comment"
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
