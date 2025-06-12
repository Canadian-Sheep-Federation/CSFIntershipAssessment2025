import express from "express";
import Actor from "../models/Actor.js";
import { getActor } from "../controller/actor.js";

const router = express.Router();

router.get("/actor/:id", async (req, res) => {
  const { id } = req.params;

  const actor = await getActor(id);

  if (!actor) {
    return res.status(404).send({ error: "Actor can't be found" });
  }

  res.json(actor);
});

router.get("/actor", async (req, res) => {
  const { search } = req.query;
  if (search) {
    console.log(`${imDBApi}/SearchName/${process.env.IMDB_API_KEY}/${search}`);
    const actorReq = await fetch(
      `${imDBApi}/SearchName/${process.env.IMDB_API_KEY}/${search}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const actorRes = await actorReq.json();

    const actors = actorRes.results.filter(
      ({ description, image }) => description.startsWith("Actor") && image
    );

    res.send(actors);
  } else {
    res.status(400).send({ error: "Must provide a search query parameter" });
  }
});

router.post("/actor/review/:actorId/:filmId", async (req, res) => {
  console.log(req.body);
  const { actorId, filmId } = req.params;
  let actor = await getActor(actorId);
  if (!actor) {
    return res.status(404).send({ error: "Actor can't be found" });
  }

  const { username, rating, review } = req.body;
  if (!username || rating === undefined || !review) {
    return res
      .status(400)
      .send({ error: "Must provide all of username, rating, and review" });
  }
  if (+rating > 10 || +rating < 0) {
    return res.status(400).send({ error: "Rating must be between 0-10" });
  }
  const userReview = { username, rating, review };

  const newActor = await Actor.updateOne(
    {
      imDBId: actorId,
      films: { $elemMatch: { imDBId: filmId } },
    },
    {
      $push: { "films.$.ratings": userReview },
    }
  );

  console.log(newActor);
  res.status(200).send({ message: "Review added" });
});

export default router;
