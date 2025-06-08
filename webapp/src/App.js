import { useState } from 'react';
import PokemonSearch from './components/PokemonSearch';
import SurveyForm from './components/SurveyForm';
import ResponseList from './components/ResponseList';

function App() {
  const [selected, setSelected] = useState('');
  const [refresh, setRefresh] = useState(0);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Pokémon Survey</h1>
      <PokemonSearch onSelect={setSelected} />
      <SurveyForm
        favoritePokemon={selected}
        onSubmitted={() => setRefresh(r => r + 1)}
      />
      <ResponseList key={refresh} />
    </div>
  );
}

export default App;
