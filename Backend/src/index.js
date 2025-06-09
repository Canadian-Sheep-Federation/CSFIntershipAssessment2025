const express = require("express");
const genius = require("./genius");
const lyrics = require("./lyrics");
const cors = require("cors");
server = express();

server.use("/", express.static("./static"));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get("/API/GET/GetLastSong", async (req, res) => {
  let song = await genius.getSongMeta();
  let lyricsResult = await lyrics.searchLyrics(
    song.data.name,
    song.data.artist,
  );
  console.log(lyricsResult.success);

  await res.send({
    success: true,
    data: {
      name: song.data.name,
      artist: song.data.artist,
      artwork: song.data.artwork,
      youtube: song.data.video,
      lyrics: lyricsResult.data,
    },
  });
});

server.get("/API/GET/GetSong/:id", async (req, res) => {
  let song = await genius.getSongMeta(req.params.id);
  let lyricsResult = await lyrics.searchLyrics(
    song.data.name,
    song.data.artist,
  );
  console.log(lyricsResult.success);

  res.send({
    success: true,
    data: {
      name: song.data.name,
      artist: song.data.artist,
      artwork: song.data.artwork,
      youtube: song.data.video,
      lyrics: lyricsResult.data,
    },
  });
});

server.post("/API/POST/SearchSongs", async (req, res) => {
  console.log(req.body);
  let search = await genius.searchSongs(
    req.body.search,
    req.body.searchCount || 10,
  );

  await res.send(search);
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
