import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'http://localhost:5000/submissions',
});

// Fetch a random GIF URL from Giphy based on a tag
export const fetchGif = async (tag: string): Promise<string> => {
  const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&tag=${tag}`);
  const json = await res.json();
  return json.data.images.original.url;
};
