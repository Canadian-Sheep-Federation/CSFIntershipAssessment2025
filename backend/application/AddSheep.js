import { SheepRepository } from "../repositorie/SheepRepository.js";

export function addSheepUseCase(sheepData) {
  return SheepRepository.addSheep(sheepData);
}
