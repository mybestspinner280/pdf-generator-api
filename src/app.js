// src/app.js

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');
const pdfRoutes = require('./routes/pdfRoutes');
const cors = require('cors');



// Rimuove il warning di Mongoose
mongoose.set('strictQuery', false);

// Creiamo l'applicazione Express
const app = express();

// Middleware per gestire i dati JSON
app.use(express.json());
app.use(cors());

// Connessione al database
mongoose.connect(config.url, config.options)
    .then(() => console.log('Connesso al database MongoDB'))
    .catch(err => console.error('Errore di connessione al database:', err));

// Aggiungiamo le routes
app.use('/api/pdf', pdfRoutes);

// Configurazione base del server
const PORT = process.env.PORT || 3000;

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});