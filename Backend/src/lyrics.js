async function SearchLyrics(song, artist) {
  let songSearch = new Request(`https://api.lyrics.ovh/v1/${artist}/${song}`);

  let result = await fetch(songSearch)
    .then((response) => response.json())
    .then((data) => {
      return {
        success: data.lyrics !== undefined,
        data: data.lyrics !== undefined ? data.lyrics : "No Lyrics Found",
      };
    });

  return result;
}

module.exports = {
  searchLyrics: SearchLyrics,
};
