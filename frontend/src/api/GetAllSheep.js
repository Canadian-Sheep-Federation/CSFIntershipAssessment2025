
// This function fetches all sheep from the backend API
export async function fetchAllSheep() {
  const apiUrl = import.meta.env.VITE_API_URL
  const res = await fetch(`${apiUrl}`);
  if (!res.ok) {
    throw new Error("Failed to fetch sheep");
  }
  console.log("Fetched all sheep from backend");
  return await res.json();
}
