import express from "express";
import { connectToDatabase } from "./connect/connect";
import { poetryRouter } from "./routes/formapi";
import cors from "cors"

const app = express();

app.use(cors());

const port = 8080; 

connectToDatabase()
    .then(() => {
        app.use("/reviews", poetryRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });