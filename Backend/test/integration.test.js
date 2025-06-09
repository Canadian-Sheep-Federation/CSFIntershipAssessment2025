require("../src/index");

test("Request a search via POST Request", async () => {
  let prompt = {
    search: "Never Gonna Give You Up",
    searchCount: 10,
  };
  let search = new Request("http://localhost:3000/API/POST/SearchSongs", {
    body: JSON.stringify(prompt),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  let output = await fetch(search)
    .then((response) => response.json())
    .then((data) => {
      expect(data.success).toBe(true);
    });
});
