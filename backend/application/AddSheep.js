import { SheepRepository } from "../repositorie/SheepRepository.js";
import { Sheep } from "../entity/Sheep.js";

// add sheep use case
export async function addSheepUseCase(sheepData) {
  return await SheepRepository.addSheep(sheepData);
}
