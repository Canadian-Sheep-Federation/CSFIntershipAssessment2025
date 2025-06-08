import { SheepRepository } from "../repositorie/SheepRepository.js";

export function getSheepByIdUseCase(id) {
  return SheepRepository.getSheepById(id);
}