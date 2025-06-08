import { Sheep } from "../entity/Sheep.js";

let sheepList = [
  new Sheep({ id: 1, name: "Dolly", age: 4, breed: "Merino", weightKg: 65, gender: "female", latitude: 45.42, longitude: -75.69 }),
  new Sheep({ id: 2, name: "Shaun", age: 2, breed: "Suffolk", weightKg: 70, gender: "male", latitude: 53.54, longitude: -113.49 }),
];

let nextId = 3;

export const SheepRepository = {
  getAllSheep: () => sheepList,

  getSheepById: (id) => sheepList.find(s => s.id === id),

  addSheep: (sheepData) => {
    const newSheep = new Sheep({ id: nextId++, ...sheepData });
    sheepList.push(newSheep);
    return newSheep;
  }
};
