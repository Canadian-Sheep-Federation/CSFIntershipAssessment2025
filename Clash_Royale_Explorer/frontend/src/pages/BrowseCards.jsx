import React, { useState } from "react";
import Card from "../components/Card";
import { useLoaderData } from "react-router-dom";

/**
 *
 * - Fetches and displays a list of Clash Royale cards from the backend.
 * - Allows users to search for cards by name.
 */
export default function BrowseCards() {
  const cardData = useLoaderData(); // Loaded card data from the route
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="browse-cards-container">
      <input
        className="card-search-bar"
        type="text"
        placeholder="Search Cards"
        onInput={(event) => {
          setSearchValue(event.target.value.toLowerCase());
        }}
      />
      <div className="card-display">
        {cardData.items.map((card, index) => {
          if (
            card.name.toLowerCase().includes(searchValue) ||
            searchValue === ""
          ) {
            return (
              <Card
                key={`Card ${index}`}
                img={card.iconUrls.medium}
                name={card.name}
                maxLevel={card.maxLevel}
                elixirCost={card.elixirCost}
                rarity={card.rarity}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

/**
 * Loader function for BrowseCards route.
 * Fetches card data from the backend API.
 */
export async function browseCardsLoader() {
  const res = await fetch("http://localhost:4000/api/clash-royale/cards");
  return res.json();
}
