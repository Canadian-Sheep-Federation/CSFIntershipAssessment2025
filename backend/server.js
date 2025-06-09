import app from "./app.js";
import { initializeDatabase } from "./infrastructure/Init.js";


const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await initializeDatabase(); // Ensure DB is ready, set up table is does not exist
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();