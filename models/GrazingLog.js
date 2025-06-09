// This file defines the structure for a "grazing log" in the database using Mongoose a Node.js library
// Each grazing log records details about a day's sheep grazing activity, including the date, paddock, number of sheep, notes, and weather. 
// This helps sheep farmers keep organized digital records of their grazing activities in MongoDB.
const mongoose = require('mongoose');

const GrazingLogSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    paddock: { type: String, required: true },
    sheep_count: { type: Number, required: true },
    notes: { type: String, default: '' },
    weather: {
        temperature: Number,
        windspeed: Number,
        weathercode: Number,
        description: String,
        precipitation: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('GrazingLog', GrazingLogSchema);