import { SheepRepository } from "../repositorie/SheepRepository.js";

// get sheep by ID use case
export async function getSheepByIdUseCase(id) {
  return await SheepRepository.getSheepById(id);
}