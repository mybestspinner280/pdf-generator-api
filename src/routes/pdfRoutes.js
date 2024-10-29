// src/routes/pdfRoutes.js

const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// Route per generare un PDF
router.post('/generate', pdfController.generatePdf.bind(pdfController));

// Route per salvare un nuovo template
router.post('/template', pdfController.saveTemplate.bind(pdfController));

// Route per verificare lo stato del servizio
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Il servizio PDF è attivo' });
});

module.exports = router;