import { getAllSheepUseCase } from "../application/GetAllSheep.js";
import { getSheepByIdUseCase } from "../application/GetSheepById.js";
import { addSheepUseCase } from "../application/AddSheep.js";

// Handles HTTP request/response.
export async function getAllSheep(req, res) {
  const sheep = await getAllSheepUseCase();
  res.status(200).json(sheep);
}

export async function getSheepById(req, res) {
  const id = parseInt(req.params.id);
  const sheep = await getSheepByIdUseCase(id);

  if (!sheep) {
    return res.status(404).json({ message: "Sheep not found" });
  }

  res.status(200).json(sheep);
}

export async function addSheep(req, res) {
  try {
    const newSheep = await addSheepUseCase(req.body);
    res.status(201).json({ id: newSheep.id }); // return the ID
  } catch (err) {
    console.error("Add sheep error:", err);
    res.status(500).json({ error: "Failed to add sheep" });
  }
}


