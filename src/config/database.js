// Configurazione per la connessione al database MongoDB
module.exports = {
    // Utilizziamo una variabile d'ambiente se disponibile, altrimenti usiamo un URL locale
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/pdf-generator',
    
    // Opzioni di connessione
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};