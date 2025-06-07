import { useState } from 'react';
import './App.css';
import { Survey } from './Survey.jsx';
import { Results } from './Results.jsx';

function App() {
  const [optionSelected, setOptionSelected] = useState("");

  const handleButton = (event) => {
    setOptionSelected(event.target.value);
  }

  return (
    <div className="App">
      <h2>Pokémon Favorites Survey!</h2>
      <h3>Select Your Favorites</h3>
      {/* display either the survey or the results depending on the button that is clicked, and set a border around the clicked button */}
      <div className="option-select">
        <button value="survey" onClick={handleButton}
        style = {{outline: optionSelected === "survey" ? "3px solid black" : ""}}>Take Survey</button>
        <button value="results" onClick={handleButton}
        style = {{outline: optionSelected === "results" ? "3px solid black" : ""}}>See Results</button>
      </div>
      {optionSelected === "survey" ? <Survey /> : optionSelected === "results" ? <Results /> : <></>}
    </div>
  );
}

export default App;