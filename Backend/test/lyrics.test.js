const lyrics = require("../src/lyrics");

test("Find Lyrics to I Wanna Dance with Somebody by Whitney Houston", async () => {
  let result = await lyrics.searchLyrics(
    "I Wanna Dance with Somebody (Who Loves Me)",
    "Whitney Houston",
  );

  expect(result.data).not.toEqual("Lyrics Not Found");
});
