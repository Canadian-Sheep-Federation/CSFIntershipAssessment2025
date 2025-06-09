import { openDb } from "../infrastructure/Db.js";
import { Sheep } from "../entity/Sheep.js";

// Handles data access, interfaces with infrastructure.
export const SheepRepository = {
  async getAllSheep() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM sheep");
    return rows.map(row => new Sheep(row));
  },

  async getSheepById(id) {
    const db = await openDb();
    const row = await db.get("SELECT * FROM sheep WHERE id = ?", id);
    return row ? new Sheep(row) : null;
  },

  async addSheep(sheepData) {
    const db = await openDb();

    const { name, age, breed, weightKg, gender, location, latitude, longitude } = sheepData;

    const result = await db.run(
      `INSERT INTO sheep (name, age, breed, weightKg, gender, location, latitude, longitude)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, age, breed, weightKg, gender, location, latitude, longitude]
    );

    return new Sheep({
      id: result.lastID,
      ...sheepData
    });
  }
};
