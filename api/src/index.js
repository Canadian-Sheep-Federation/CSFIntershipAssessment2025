import express from 'express';
import cors from 'cors';    
import responsesRouter from './routes/responses.js';

const app = express();
app.use(cors());           
app.use(express.json());

// Mount routes under /responses
app.use('/responses', responsesRouter);

// Check
app.get('/', (req, res) => res.send('CSF API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
