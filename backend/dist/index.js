import express from "express";
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get("/word", (req, res) => {
    const word = req.query.word;
    if (!word) {
        return res.status(400).json({ error: "Word query parameter is required" });
    }
    return res.json({ word });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map