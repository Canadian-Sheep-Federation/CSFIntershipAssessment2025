import express from "express";
import 'dotenv/config'
import {PrismaClient} from "../generated/prisma/index.js"

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/word", async (req, res) => {
  const word = req.query.word as string | undefined;
  if (!word) {
    res.status(400).json({ error: "Word query parameter is required" });
  }

  const wordPrisma = await prisma.word.findFirst({
    where: {word},
    select: {
      sentences: {
        select: {
          id: true,
          text: true,
        }
      },
      word: true,
      definition: true,
      partOfSpeech: true,
    }
  });

  if (wordPrisma) {
    console.log(wordPrisma);
    res.json({ result: wordPrisma });
    return;
  }
  const apiReq = await fetch(`https://www.stands4.com/services/v2/syno.php?uid=${process.env.UID}&tokenid=${process.env.TOKEN_ID}&word=${word}&format=json`);
  const apiData = await apiReq.json();

  if (apiData.error) {
    res.status(404).json({ error: "Word not found" });
    return;
  }

  const externalWordData = apiData.result.result;
  const wordRes = {
    word: externalWordData.term,
    definition: externalWordData.definition,
    partOfSpeech: externalWordData.partofspeech,
    sentences: []
  };

  const newWord = await prisma.word.create({
    data: {
      word: wordRes.word,
      definition: wordRes.definition,
      partOfSpeech: wordRes.partOfSpeech,
    }
  });
  console.log(wordRes);
  res.json({ result: wordRes });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});