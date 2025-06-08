export async function submitSheep(payload) {
  const res = await fetch("http://localhost:3000/api/sheep", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit sheep");
  }

  return await res.json(); // returns { id }
}
