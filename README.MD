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