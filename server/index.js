import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import actorRouter from "./routes/actor.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

global.imDBApi = "https://imdb-api.com/en/API";

app.use(bodyParser.json());
app.use(cors());
app.use(actorRouter);

app.listen(3000, async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Server running on port 3000");
});
