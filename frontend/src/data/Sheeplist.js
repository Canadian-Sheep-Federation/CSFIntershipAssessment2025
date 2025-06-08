import { Sheep } from "../entity/Sheep.js";

let sheepList = []; // ready to be populated from backend

export function getSheepList() {
  return sheepList;
}

export function addSheep(sheep) {
  sheepList.push(sheep);
}

export function setSheepList(newList) {
  sheepList = newList;
}

/**
 * Dev helper: only call in frontend to inject test sheep
 */
export function loadMockSheepData() {
  sheepList = [
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
}
