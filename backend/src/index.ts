import express from "express";
import 'dotenv/config'
import { PrismaClient} from "../generated/prisma/index.js"
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.get("/word", async (req, res) => {
  let word = req.query.word as string | undefined;
  if (!word) {
    res.status(400).json({ error: "Word query parameter is required" });
    return;
  }

  word = word.trim().toLowerCase();

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
    res.json({ result: wordPrisma });
    return;
  }
  const apiReq = await fetch(`https://www.stands4.com/services/v2/syno.php?uid=${process.env.UID}&tokenid=${process.env.TOKEN_ID}&word=${word}&format=json`);
  const apiData = await apiReq.json();

  if (apiData.error) {
    res.status(404).json({ error: "Error finding word" });
    return;
  }

  const wordsResults = apiData.result.filter((r: any) => r.term=== word);
  if (apiData.result.length === 0 || wordsResults.length === 0) {
    res.status(404).json({ error: "Word not found in dictionary API" });
    return;
  }

  const externalWordData = wordsResults[0];

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

app.get("/words", async (_req, res) => {
  const words = await prisma.word.findMany({
    select: {
      id: true,
      word: true,
      definition: true,
      partOfSpeech: true,
      sentences: {
        select: {
          id: true,
          text: true,
        }
      }
    }
  });

  res.json({ result: words });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});