# Test dello stato del servizio
curl http://localhost:3000/api/pdf/health

# Salvare un nuovo template
curl -X POST http://localhost:3000/api/pdf/template \
  -H "Content-Type: application/json" \
  -d '{"name":"fattura","content":"<h1>Fattura per {{cliente}}</h1><p>Importo: €{{importo}}</p>"}'

# Generare un PDF
curl -X POST http://localhost:3000/api/pdf/generate \
  -H "Content-Type: application/json" \
  -d '{"templateName":"fattura","data":{"cliente":"Mario Rossi","importo":"100.00"}}' \
  --output fattura.pdf


# Per usare questo seed:

Crea la cartella seeds:

mkdir src/seeds

Crea il file:

touch src/seeds/condominioSeed.js

Copia il contenuto dell'artifact nel file
Esegui il seed:

node src/seeds/condominioSeed.js

## Per generare un PDF di prova:
curl -X POST http://localhost:3000/api/pdf/generate \
  -H "Content-Type: application/json" \
  -d '{
    "templateName": "convocazione_assemblea",
    "data": {
      "nome": "Mario",
      "cognome": "Rossi",
      "indirizzo_residenza": "Via Garibaldi 45, 20100 Milano (MI)",
      "appartamento": "1A",
      "nome_condominio": "Condominio Aurora",
      "indirizzo_condominio": "Via Roma 123, Milano",
      "tipo_convocazione": "prima",
      "tipo_seconda_convocazione": "seconda",
      "data_prima_convocazione": "15/11/2024",
      "ora_prima_convocazione": "18:00",
      "data_seconda_convocazione": "16/11/2024",
      "ora_seconda_convocazione": "18:00",
      "luogo_assemblea": "Sala riunioni del condominio",
      "ordine_del_giorno": [
        "Approvazione bilancio consuntivo 2024",
        "Preventivo spese 2025",
        "Lavori di manutenzione straordinaria",
        "Varie ed eventuali"
      ],
      "luogo": "Milano",
      "data_convocazione": "29/10/2024",
      "nome_amministratore": "Dott. Giovanni Bianchi",
      "telefono_amministratore": "02-1234567",
      "email_amministratore": "amministratore@condominio.it"
    }
  }' \
  --output convocazione.pdf


# puoi vedere i template in questi modi:

Usando curl per vedere la lista di tutti i template:

curl http://localhost:3000/api/pdf/templates

Per vedere un template specifico:

curl http://localhost:3000/api/pdf/template/convocazione_assemblea