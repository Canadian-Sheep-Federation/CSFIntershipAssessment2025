import express from "express";
import sheepRoutes from "./SheepRoutes.js";
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/sheep", sheepRoutes);

export default app;
