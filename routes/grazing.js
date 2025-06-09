// Express routes for creating and retrieving grazing logs
const express = require('express');
const router = express.Router();
const GrazingLog = require('../models/GrazingLog');

// POST /
router.post('/', async (req, res) => {
    try {
        const log = new GrazingLog(req.body);
        await log.save();
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /:id
router.get('/:id', async (req, res) => {
    try {
        const log = await GrazingLog.findById(req.params.id);
        if (!log) return res.status(404).json({ error: 'Not found' });
        res.json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET /
router.get('/', async (req, res) => {
    try {
        const logs = await GrazingLog.find();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;