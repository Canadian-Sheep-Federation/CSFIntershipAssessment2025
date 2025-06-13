const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET route to fetch all form submissions
router.get('/', async (req, res) => {
    try {
        const forms = await prisma.formSubmission.findMany();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms' });
    }
});

// GET route to fetch a specific form submission by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const form = await prisma.formSubmission.findUnique({
            where: { id: parseInt(id) },
        });
        if (form) {
            res.status(200).json(form);
        } else {
            res.status(404).json({ error: 'Form not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch form' });
    }
});

// GET route to fetch all form submissions for a specific country
router.get('/country/:country', async (req, res) => {
    const { country } = req.params;
    try {
        const forms = await prisma.formSubmission.findMany({
            where: { country },
        });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch forms for country' });
    }
});

// POST route to handle form submission
router.post('/', async (req, res) => {
    const { country, reason, visited } = req.body;
    try {
        const newFormSubmission = await prisma.formSubmission.create({
            data: {
                country,
                reason,
                visited,
            },
        });
        res.status(201).json({ message: 'Form submitted successfully', data: newFormSubmission });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save form data' });
    }
});

// Client-side code to fetch forms for a specific country
function fetchFormsForCountry(country, setForms, setLoading) {
    fetch(`/api/forms/country/${country}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setForms(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching forms:', error);
            setLoading(false);
        });
}

module.exports = router;