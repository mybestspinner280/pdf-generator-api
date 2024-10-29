// src/models/template.js

const mongoose = require('mongoose');

// Schema per il template PDF
const templateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true        // Rimuove gli spazi bianchi all'inizio e alla fine
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crea e esporta il modello
module.exports = mongoose.model('Template', templateSchema);