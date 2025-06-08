import { getAllSheepUseCase } from "../application/GetAllSheep.js";
import { getSheepByIdUseCase } from "../application/GetSheepById.js";
import { addSheepUseCase } from "../application/AddSheep.js";

export function getAllSheep(req, res) {
  const sheep = getAllSheepUseCase();
  res.status(200).json(sheep);
}

export function getSheepById(req, res) {
  const id = parseInt(req.params.id);
  const sheep = getSheepByIdUseCase(id);

  if (!sheep) {
    return res.status(404).json({ message: "Sheep not found" });
  }

  res.status(200).json(sheep);
}

export function addSheep(req, res) {
  const sheepData = req.body;
  const newSheep = addSheepUseCase(sheepData);
  console.log("New sheep added:", newSheep);
  res.status(201).json(newSheep);
}

