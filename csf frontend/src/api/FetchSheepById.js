export async function fetchSheepById(id) {
  const res = await fetch(`http://localhost:3000/${id}`);

  if (!res.ok) {
    throw new Error("Sheep not found");
  }

  return await res.json();
}
