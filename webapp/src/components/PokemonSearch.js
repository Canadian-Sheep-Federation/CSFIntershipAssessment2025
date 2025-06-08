import { useState } from 'react';
import axios from 'axios';

export default function PokemonSearch({ onSelect }) {
  const [name, setName] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchPokemon = async () => {
    if (!name) return;
    try {
      setError('');
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setData(res.data);
      onSelect(res.data.name);
    } catch {
      setError('Not found');
      setData(null);
      onSelect('');
    }
  };

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button onClick={fetchPokemon}>Search</button>
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h4>{data.name}</h4>
          <img src={data.sprites.front_default} alt={data.name} />
        </div>
      )}
    </div>
  );
}
