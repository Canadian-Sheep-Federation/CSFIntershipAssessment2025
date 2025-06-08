import { fetchSheepById } from "../api/FetchSheepById.js";

export function setupGetSheepByIdForm() {
  const form = document.getElementById("get-sheep-form");
  const resultDiv = document.getElementById("sheep-result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = form.sheepId.value.trim();

    try {
      const sheep = await fetchSheepById(id);
      resultDiv.textContent = `${sheep.name}, ${sheep.age} y/o ${sheep.breed}, ${sheep.weightKg}kg (${sheep.latitude}, ${sheep.longitude})`;
    } catch (err) {
      console.error(err);
      resultDiv.textContent = "Sheep not found or error occurred.";
    }
  });
}
