import React from "react";

/**
 * 
 * Displays information about a Clash Royale card.
 * 
 * Props:
 * @param {string} img - The URL of the card image.
 * @param {string} name - The name of the card.
 * @param {number} maxLevel - The maximum level this card can reach.
 * @param {number} elixirCost - The elixir cost required to play this card.
 * @param {string} rarity - The rarity classification of the card (e.g., "common", "rare", etc.).
 * 
 * @returns A visual card representation including image and metadata.
 */

export default function Card({ img, name, maxLevel, elixirCost, rarity }) {
  return (
    <div className="card-container">
      {/* Card image */}
      <img
        src={img}
        alt={`${name} card image`}
      />
      
      {/* Card details */}
      <div>
        <h4>Name: {name}</h4>
        <h4>Max Level: {maxLevel}</h4>
        <h4>Elixir Cost: {elixirCost}</h4>
        <h4>Rarity: {rarity}</h4>
      </div>
    </div>
  );
}
