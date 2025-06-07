import React, { useState } from 'react';
import './Survey.css';

export const Survey = () => {
  const [userID, setUserID] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [pokemonEntries, setPokemonEntries] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [selectedType, setSelectedType] = useState([]);
  const [haveSubmitted, setHaveSubmitted] = useState(false);
  const [userIDSubmit, setUserIDSubmit] = useState("");

  // call public pokeapi to retrieve a list of all pokemon
  async function getPokedex() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokedex/1/`);
      if (!response.ok) {
        console.log(response.status);
      }
      else {
        const data = await response.json();
        setPokemonEntries(data.pokemon_entries);
      }
    } catch (error) {
      console.log(error);
    } 
  }

  const handleInput = (event) => {
    setUserID(event.target.value);
    setHaveSubmitted(false);
  }

  const changeRegion = (event) => {
    setSelectedRegion(event.target.value);
    getPokedex();
    setHaveSubmitted(false);
  };

  // display pokemon list filtered by search input
  const handleSearch = (event) => {
    const query = event.target.value;
    const filtered = pokemonEntries.filter(item =>
    item.pokemon_species.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSelect = (name) => {
    setSelectedPokemon(name);
    setHaveSubmitted(false);
  }

  const changeType = (event) => {
    setSelectedType(event.target.value);
    setHaveSubmitted(false);
  }

  // submit the userid, the chosen region, pokemon, and type to be entered into the database
  const submit = async() => {
    setHaveSubmitted(true);
    if (selectedRegion !== "" && selectedPokemon !== "" && selectedType !== "") {
      const data = {userid: userID, region: selectedRegion, pokemon: selectedPokemon, type: selectedType};
      try {
        const response = await fetch('http://localhost:4000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          console.log(response.status);
        } 
        else {
          const jsonResponse = response.json();
          setUserIDSubmit(jsonResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="survey">
      <label htmlFor="enter-userid">Enter Your Username: </label>
      <input type="text" id="enter-userid" onChange={handleInput}/>
      <div className="pick-region">
        <label htmlFor="region">Choose a region: </label>
        <select id="region" onChange={changeRegion}>
          <option value="">--Select--</option>
          <option value="Kanto">Kanto</option>
          <option value="Johto">Johto</option>
          <option value="Hoenn">Hoenn</option>
          <option value="Sinnoh">Sinnoh</option>
          <option value="Unova">Unova</option>
          <option value="Kalos">Kalos</option>
          <option value="Alola">Alola</option>
          <option value="Galar">Galar</option>
          <option value="Paldea">Paldea</option>
        </select>
      </div>

      {/* only display the pokemon search if a region is chosen */}
      {selectedRegion !== "" ? 
        <div className="search">
          <label htmlFor="pokemon-search">Search Pokémon: </label>
          <input type="text" id="pokemon-search" onChange={handleSearch} placeholder="Type to search..."/>
          {/* display a filtered list based on the content of the search bar */}
          {filteredItems.length > 0 ? (
            <>
              <ul className="pokemon-list">
                {filteredItems.map((item, index) => (
                  <li key={index} onClick={() => handleSelect(item.pokemon_species.name)}
                  // change background of pokemon list item when selected
                  style = {{backgroundColor: selectedPokemon === item.pokemon_species.name ? "rgb(212, 212, 212)" : ""}}>{item.pokemon_species.name}</li>
                ))}
              </ul>
              {selectedPokemon !== "" ? <p className="selected">You chose {selectedPokemon}!</p> : <></>}
            </>
          ) : (
            <p>No matches found</p>
          )}
        </div> 
      : <></>}

      {/* only display the type picker if a pokemon and region are selected */}
      {selectedPokemon !== "" && selectedRegion !== "" ?
        <div className="pick-type">
          <label htmlFor="types">Select a Type: </label>
          <select id="types" onChange={changeType}>
            <option value="">--Select--</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Grass">Grass</option>
            <option value="Electric">Electric</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dark">Dark</option>
            <option value="Dragon">Dragon</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
          </select>
        </div>
      : <></> }

      {/* only display the submit button if everything is filled in */}
      {selectedRegion !== "" && selectedPokemon !== "" && selectedType !== "" ?
        <button className='submit' onClick={submit}>SUBMIT</button>
      : <></>}
      {/* display a submit message every time the button is pressed */}
      {haveSubmitted ? <div className="final-message">{userIDSubmit} has submitted a response. To update your answer, change any field and submit again. To create a new entry, change your username. To view database entries, click the See Results button!</div> : <></>}
    </div>
  );
}