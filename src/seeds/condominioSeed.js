// src/seeds/condominioSeed.js

const mongoose = require('mongoose');
const Template = require('../models/template');

// Configurazione della connessione MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pdf-generator', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connesso per il seeding');
    } catch (error) {
        console.error('Errore di connessione MongoDB:', error);
        process.exit(1);
    }
};

// Dati di mock per i condomini
const condomini = [
    {
        nome: "Mario",
        cognome: "Rossi",
        indirizzo_residenza: "Via Garibaldi 45, 20100 Milano (MI)",
        appartamento: "1A",
        millesimi: 95,
        email: "mario.rossi@email.com",
        telefono: "333-1234567",
        proprietario: true,
        residenza_diversa: false
    },
    {
        nome: "Laura",
        cognome: "Bianchi",
        indirizzo_residenza: "Corso Vittorio Emanuele 123, 20121 Milano (MI)",
        appartamento: "2B",
        millesimi: 105,
        email: "laura.bianchi@email.com",
        telefono: "333-2345678",
        proprietario: true,
        residenza_diversa: true
    },
    {
        nome: "Giuseppe",
        cognome: "Verdi",
        indirizzo_residenza: "Via Mozart 78, 20129 Milano (MI)",
        appartamento: "3A",
        millesimi: 85,
        email: "giuseppe.verdi@email.com",
        telefono: "333-3456789",
        proprietario: true,
        residenza_diversa: false
    },
    {
        nome: "Anna",
        cognome: "Neri",
        indirizzo_residenza: "Piazza della Repubblica 15, 20124 Milano (MI)",
        appartamento: "4C",
        millesimi: 110,
        email: "anna.neri@email.com",
        telefono: "333-4567890",
        proprietario: false,
        residenza_diversa: false
    },
    {
        nome: "Marco",
        cognome: "Ferrari",
        indirizzo_residenza: "Viale Monza 256, 20128 Milano (MI)",
        appartamento: "5B",
        millesimi: 98,
        email: "marco.ferrari@email.com",
        telefono: "333-5678901",
        proprietario: true,
        residenza_diversa: true
    }
];

// Template per la convocazione dell'assemblea
const templateConvocazione = {
    name: "convocazione_assemblea",
    content: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
            color: #333;
        }
        .destinatario {
            margin-bottom: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 20px;
        }
        .details {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 5px;
        }
        .agenda {
            margin: 20px 0;
        }
        .agenda ol {
            margin-left: 20px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
        }
        .warning {
            background: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .delega {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px dashed #999;
        }
    </style>
</head>
<body>
    <div class="destinatario">
        <p>Spett.le<br>
        {{cognome}} {{nome}}<br>
        {{indirizzo_residenza}}</p>
    </div>

    <div class="header">
        <h1>Convocazione Assemblea Condominiale</h1>
        <h2>Condominio {{nome_condominio}}</h2>
        <p>{{indirizzo_condominio}}</p>
    </div>

    <div class="details">
        <p>Gentile ${'proprietario' ? 'Proprietario' : 'Inquilino'},</p>
        <p>è convocata l'assemblea condominiale in {{tipo_convocazione}} convocazione per il giorno {{data_prima_convocazione}} alle ore {{ora_prima_convocazione}}, ed in {{tipo_seconda_convocazione}} convocazione per il giorno {{data_seconda_convocazione}} alle ore {{ora_seconda_convocazione}}, presso {{luogo_assemblea}} per discutere e deliberare sul seguente:</p>
    </div>

    <div class="agenda">
        <h3>ORDINE DEL GIORNO</h3>
        <ol>
            {{#each ordine_del_giorno}}
            <li>{{this}}</li>
            {{/each}}
        </ol>
    </div>

    <div class="warning">
        <p>Si ricorda che:</p>
        <ul>
            <li>In caso di impossibilità a partecipare è possibile delegare un altro condomino utilizzando il modulo di delega sotto riportato</li>
            <li>La validità della {{tipo_prima_convocazione}} convocazione è subordinata alla presenza di condomini che rappresentino i 2/3 dei millesimi</li>
            <li>La {{tipo_seconda_convocazione}} convocazione sarà valida qualunque sia il numero dei presenti</li>
        </ul>
    </div>

    <div class="footer">
        <p>{{luogo}}, {{data_convocazione}}</p>
        <p>L'amministratore<br>{{nome_amministratore}}</p>
        <p>Per informazioni:<br>
        Tel: {{telefono_amministratore}}<br>
        Email: {{email_amministratore}}</p>
    </div>

    <div class="delega">
        <h3>DELEGA</h3>
        <p>Il/La sottoscritto/a ________________________________________</p>
        <p>proprietario/a dell'appartamento {{appartamento}}</p>
        <p>DELEGA</p>
        <p>Il/La Sig./Sig.ra ________________________________________</p>
        <p>a rappresentarlo/a nell'assemblea condominiale del {{data_seconda_convocazione}}</p>
        <p>Data _______________ Firma _______________</p>
    </div>
</body>
</html>`
};

// Funzione per eseguire il seed
const seedDatabase = async () => {
    try {
        await connectDB();

        // Pulisci il database
        await Template.deleteMany({});

        // Inserisci il template
        await Template.create(templateConvocazione);

        console.log('Seed completato con successo!');
        process.exit(0);
    } catch (error) {
        console.error('Errore durante il seed:', error);
        process.exit(1);
    }
};

// Esegui il seed
seedDatabase();

module.exports = {
    condomini,
    templateConvocazione
};