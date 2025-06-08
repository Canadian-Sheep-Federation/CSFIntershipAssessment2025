import { submitSheep } from "../api/SubmitSheep.js";
import { Sheep } from "../entity/Sheep.js";
import { addSheep, getSheepList } from "../data/SheepList.js";
import { renderGrid } from "../components/SheepGrid.js";

export function setupNewSheepForm() {
  const form = document.getElementById("new-sheep-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload.age = Number(payload.age);
    payload.weightKg = Number(payload.weightKg);
    payload.latitude = parseFloat(payload.latitude);
    payload.longitude = parseFloat(payload.longitude);

    try {
      const result = await submitSheep(payload); // POST to backend

      const newSheep = new Sheep({ ...payload });
      addSheep(newSheep); // stateful addition
      renderGrid(getSheepList()); // re-render from current state

      form.reset();
      document.getElementById("add-modal").classList.add("hidden");
    } catch (err) {
      console.error(err);
      alert("Failed to add sheep");
    }
  });
}
