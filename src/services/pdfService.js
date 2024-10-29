// src/services/pdfService.js

const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

class PdfService {
    async generatePdf(template, data) {
        try {
            console.log('Iniziando generazione PDF');
            console.log('Template ricevuto:', template);
            console.log('Dati ricevuti:', data);

            // Compila il template con i dati
            const compiledTemplate = handlebars.compile(template);
            const html = compiledTemplate(data);
            console.log('HTML generato:', html);

            console.log('Avvio browser Puppeteer...');
            const browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            console.log('Browser avviato, creazione nuova pagina...');
            const page = await browser.newPage();
            
            console.log('Impostazione contenuto HTML...');
            await page.setContent(html);

            console.log('Generazione PDF...');
            const pdf = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20px',
                    right: '20px',
                    bottom: '20px',
                    left: '20px'
                }
            });

            console.log('PDF generato con successo');
            await browser.close();
            console.log('Browser chiuso');

            return pdf;
        } catch (error) {
            console.error('Errore dettagliato nella generazione del PDF:', error);
            throw error;
        }
    }
}

module.exports = new PdfService();