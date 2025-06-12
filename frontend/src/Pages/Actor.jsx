import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieItemComponent from "../Components/MovieItemComponent";

import "../styles/actor.scss";

const Actor = () => {
  const { id } = useParams();

  const [actor, setActor] = useState(null);

  useEffect(() => {
    (async () => {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/actor/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      setActor(res);
    })();
  }, []);

  return (
    <div className="actor">
      {actor === null ? (
        <p>Loading...</p>
      ) : (
        <>
          {!actor ? (
            <p>Actor not found</p>
          ) : (
            <>
              <>
                <img src={actor.image} alt={actor.name} className="actor__actor-img"/>
                <h1>{actor.name}</h1>
                <div>{actor.summary}</div>
              </>
              <div className="actor__films">
                {actor.films.map((film) => (
                  <MovieItemComponent movie={film} key={film._id} actorId={actor.imDBId} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Actor;
