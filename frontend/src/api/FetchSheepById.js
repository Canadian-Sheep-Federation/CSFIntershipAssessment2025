export async function fetchSheepById(id) {
  const apiUrl = import.meta.env.VITE_API_URL
  const res = await fetch(`${apiUrl}${id}`);

  if (!res.ok) {
    throw new Error("Sheep not found");
  }

  return await res.json();
}
