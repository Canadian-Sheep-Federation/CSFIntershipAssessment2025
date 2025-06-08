import express from "express";
import { getAllSheep, getSheepById, addSheep } from "../backend/controller/SheepController.js";

const router = express.Router();

router.get("/", getAllSheep);
router.get("/:id", getSheepById);
router.post("/", addSheep);

export default router;
