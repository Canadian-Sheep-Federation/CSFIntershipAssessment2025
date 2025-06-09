const genius = require("../src/genius");
require("dotenv").config();

test("Overview", () => {
  console.log("Genius API Key:", process.env.GENIUS_API_KEY);
  expect(process.env.GENIUS_API_KEY).toBeDefined();
});

test("Find song with ID 243002 - I Wanna Dance With Somebody (Who Loves Me)", async () => {
  let search = await genius.getSongMeta(243002);

  expect(search).toBeDefined();

  expect(search.data.name).toBe("I Wanna Dance With Somebody (Who Loves Me)");
  expect(search.data.artist).toBe("Whitney Houston");
  expect(search.data.video).toBe("https://www.youtube.com/embed/eH3giaIzONA");
});
