import './style.css'
import { Sheep } from './entity/sheep.js';
import { renderGrid } from './components/SheepGrid.js';

const sheepList = [
  new Sheep({
    name: "Dolly",
    age: 4,
    breed: "Merino",
    weightKg: 65,
    gender: "female",
    latitude: 45.4215,
    longitude: -75.6998,
  }),
  new Sheep({
    name: "Shaun",
    age: 2,
    breed: "Suffolk",
    weightKg: 70,
    gender: "male",
    latitude: 53.5461,
    longitude: -113.4938,
  }),
  new Sheep({
    name: "Wooly",
    age: 3,
    breed: "Hampshire",
    weightKg: 60,
    gender: "male",
    latitude: 49.8951,
    longitude: -97.1384,
  }),
];
console.log("Sheep list loaded:", sheepList);
document.addEventListener("DOMContentLoaded", () => {
  renderGrid(sheepList);
});

document.addEventListener("DOMContentLoaded", () => {
  renderGrid(sheepList);
});
