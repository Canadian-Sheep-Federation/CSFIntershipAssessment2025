import { SheepRepository } from "../repositorie/SheepRepository.js";

// get all sheep use case
export async  function getAllSheepUseCase() {
  return await SheepRepository.getAllSheep();
}