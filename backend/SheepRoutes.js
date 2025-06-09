import express from "express";
import { getAllSheep, getSheepById, addSheep } from "../backend/controller/SheepController.js";

const router = express.Router();

router.get("/", getAllSheep); // get all sheep
router.get("/:id", getSheepById); // get sheep by ID
router.post("/", addSheep); // add new sheep

export default router;
