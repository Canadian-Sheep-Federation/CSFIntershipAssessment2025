import Actor from "../models/Actor.js";

export const getActor = async (id) => {
  let actor = await Actor.findOne({ imDBId: id });

  if (!actor) {
    const actorReq = await fetch(
      `${imDBApi}/Name/${process.env.IMDB_API_KEY}/${id}`
    );
    const actorRes = await actorReq.json();
    if (!actorRes) return null;

    const knownForFilms = actorRes.knownFor.map(
      ({ fullTitle, role, image, id }) => ({
        imDBId: id,
        title: fullTitle,
        role,
        image,
        ratings: [],
      })
    );

    const castForFilms = actorRes.castMovies.map(
      ({ id, title, year, role, description }) => {
        if (!year || role !== "Actor") {
          return;
        }

        return { imDBId: id, title: `${title} (${year})`, role: description };
      }
    );

    actor = await Actor.create({
      name: actorRes.name,
      birthDate: actorRes.birthDate,
      image: actorRes.image,
      imDBId: actorRes.id,
      summary: actorRes.summary,
      films: [...knownForFilms, ...castForFilms],
    });
  }

  return actor;
};
