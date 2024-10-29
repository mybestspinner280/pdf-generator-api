# API Documentation - PDF Generator

## Base URL
```
http://localhost:3000/api/pdf
```

## Endpoints

### 1. Lista Template
Recupera la lista di tutti i template disponibili.

**Endpoint:** `/templates`  
**Method:** `GET`  
**Response:** `200 OK`
```json
[
  {
    "_id": "5f7b5e7c8e9f4b2b3c1d8e9f",
    "name": "convocazione_assemblea",
    "createdAt": "2024-10-29T10:00:00.000Z"
  }
]
```

### 2. Recupera Template Specifico
Recupera i dettagli di un template specifico.

**Endpoint:** `/template/:name`  
**Method:** `GET`  
**Parameters:** 
- `name`: Nome del template (in URL)

**Response:** `200 OK`
```json
{
  "_id": "5f7b5e7c8e9f4b2b3c1d8e9f",
  "name": "convocazione_assemblea",
  "content": "<!DOCTYPE html><html>...",
  "createdAt": "2024-10-29T10:00:00.000Z"
}
```

### 3. Salva Nuovo Template
Crea un nuovo template o aggiorna uno esistente.

**Endpoint:** `/template`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Body:**
```json
{
  "name": "nome_template",
  "content": "<!DOCTYPE html><html>..."
}
```
**Response:** `201 Created`
```json
{
  "message": "Template salvato con successo",
  "template": {
    "name": "nome_template",
    "content": "<!DOCTYPE html><html>...",
    "createdAt": "2024-10-29T10:00:00.000Z"
  }
}
```

### 4. Genera PDF
Genera un PDF utilizzando un template esistente e i dati forniti.

**Endpoint:** `/generate`  
**Method:** `POST`  
**Content-Type:** `application/json`  
**Body:**
```json
{
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
}
```
**Response:** `200 OK`  
**Content-Type:** `application/pdf`  
**Content-Disposition:** `attachment; filename=nome_template.pdf`  
**Body:** Binary PDF file

## Gestione Errori

### Errori Comuni

1. **404 Not Found**
```json
{
  "error": "Template non trovato"
}
```

2. **500 Internal Server Error**
```json
{
  "error": "Errore nella generazione del PDF",
  "details": "Descrizione dettagliata dell'errore"
}
```

## Note per lo Sviluppo Frontend

1. Per il download dei PDF:
   - Utilizzare il metodo `GET` con `fetch`
   - Gestire la risposta come `blob`
   - Creare un URL oggetto per il download

Esempio di codice frontend per il download:
```javascript
fetch('http://localhost:3000/api/pdf/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    templateName: 'convocazione_assemblea',
    data: {
      // ... dati del template
    }
  })
})
.then(response => response.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'documento.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
});
```

2. Per la gestione dei template:
   - Recuperare la lista dei template all'avvio dell'applicazione
   - Implementare una cache lato client per i template più usati
   - Gestire gli errori mostrando feedback appropriati all'utente

## Rate Limiting e Sicurezza
- Attualmente non sono implementati limiti di rate
- Si consiglia di implementare autenticazione e autorizzazione prima della messa in produzione
- Validare sempre i dati in input lato client prima dell'invio

## Ambiente di Sviluppo
```bash
# Avvio del server
npm start

# Ambiente di sviluppo con hot reload
npm run dev
```