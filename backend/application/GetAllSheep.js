import { SheepRepository } from "../repositorie/SheepRepository.js";

export function getAllSheepUseCase() {
  return SheepRepository.getAllSheep();
}