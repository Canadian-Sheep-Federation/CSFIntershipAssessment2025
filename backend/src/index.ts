import express from "express";
import 'dotenv/config'
import {PrismaClient} from "../generated/prisma"


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/word", (req, res) => {
  const word = req.query.word as string | undefined;
  if (!word) {
    res.status(400).json({ error: "Word query parameter is required" });
  }

  

  const apiReq = fetch(`https://api.example.com/words/${word}`);
  res.json({ word });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});