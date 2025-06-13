const express = require('express');
const formRoutes = require('./routes/formRoutes.cjs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/forms', formRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});