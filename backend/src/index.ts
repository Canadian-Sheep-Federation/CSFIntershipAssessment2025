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
      id: true,
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

  const externalWordData = apiData.result[0];
  const { id, definition, partOfSpeech } = await prisma.word.create({
    data: {
      word: externalWordData.term,
      definition: externalWordData.definition,
      partOfSpeech: externalWordData.partofspeech,
    }
  });
  
  res.json({ result: { id, word, definition, partOfSpeech } });
});

app.post("/sentence/:wordId", async (req, res) => {
  const { wordId } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: "Text is required" });
  }

  const sentence = await prisma.sentence.create({
    data: {
      text,
      word: {
        connect: { id: wordId }
      }
    }
  });

  res.json({ result: sentence });
});

app.get("/sentence/:sentenceId", async (req, res) => {
  const { sentenceId } = req.params;

  const sentence = await prisma.sentence.findUnique({
    where: { id: sentenceId },
    include: {
      word: {
        select: {
          id: true,
          word: true,
          definition: true,
          partOfSpeech: true,
        }
      }
    }
  });

  if (!sentence) {
    res.status(404).json({ error: "Sentence not found" });
  }

  res.json({ result: sentence });
});

app.get("/sentences", async (req, res) => {
  const sentences = await prisma.sentence.findMany({
    include: {
      word: {
        select: {
          id: true,
          word: true,
          definition: true,
          partOfSpeech: true,
        }
      }
    },
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.json({ result: sentences });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});