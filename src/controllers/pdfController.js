// src/controllers/pdfController.js

const Template = require('../models/template');
const pdfService = require('../services/pdfService');

class PdfController {
    async generatePdf(req, res) {
        try {
            console.log('Ricevuta richiesta di generazione PDF:', req.body);
            const { templateName, data } = req.body;

            // Debug: stampa i dati ricevuti
            console.log('Template richiesto:', templateName);
            console.log('Dati ricevuti:', data);

            // Trova il template nel database
            const template = await Template.findOne({ name: templateName });
            console.log('Template trovato:', template);

            if (!template) {
                console.log('Template non trovato nel database');
                // Per test, usiamo un template hardcoded
                const htmlContent = `
                    <html>
                        <body>
                            <h1>Fattura per ${data.cliente}</h1>
                            <p>Importo: €${data.importo}</p>
                        </body>
                    </html>
                `;
                const pdf = await pdfService.generatePdf(htmlContent, data);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${templateName}.pdf`);
                return res.send(pdf);
            }

            // Genera il PDF
            const pdf = await pdfService.generatePdf(template.content, data);

            // Imposta gli header per il download
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${templateName}.pdf`);

            // Invia il PDF
            res.send(pdf);

        } catch (error) {
            console.error('Errore dettagliato nel controller:', error);
            res.status(500).json({ 
                error: 'Errore nella generazione del PDF',
                details: error.message,
                stack: error.stack
            });
        }
    }

    async saveTemplate(req, res) {
        try {
            console.log('Ricevuta richiesta di salvataggio template:', req.body);
            const { name, content } = req.body;

            const template = new Template({
                name,
                content
            });

            await template.save();
            console.log('Template salvato con successo:', template);

            res.status(201).json({ message: 'Template salvato con successo', template });
        } catch (error) {
            console.error('Errore nel salvataggio del template:', error);
            res.status(500).json({ 
                error: 'Errore nel salvataggio del template',
                details: error.message 
            });
        }
    }

    async listTemplates(req, res) {
        try {
            const templates = await Template.find({}, 'name createdAt');
            res.json(templates);
        } catch (error) {
            console.error('Errore nel recupero dei template:', error);
            res.status(500).json({ error: 'Errore nel recupero dei template' });
        }
    }

    async getTemplate(req, res) {
        try {
            const template = await Template.findOne({ name: req.params.name });
            if (!template) {
                return res.status(404).json({ error: 'Template non trovato' });
            }
            res.json(template);
        } catch (error) {
            console.error('Errore nel recupero del template:', error);
            res.status(500).json({ error: 'Errore nel recupero del template' });
        }
    }
}

module.exports = new PdfController();