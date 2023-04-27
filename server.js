const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Verifica se la richiesta è per l'indirizzo principale "/"
  if (req.url === '/') {
    // Legge il contenuto del file index.html
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Se si verifica un errore durante la lettura del file, restituisci un errore 500
        res.writeHead(500);
        res.end(`Errore durante la lettura del file index.html: ${err}`);
      } else {
        // Imposta l'intestazione della risposta
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // Restituisci il contenuto del file index.html
        res.end(content, 'utf-8');
      }
    });
  } else {
    // Se la richiesta non è per l'indirizzo principale, restituisci un errore 404
    res.writeHead(404);
    res.end('Pagina non trovata');
  }
});

// Avvia il server sulla porta 3000
server.listen(3000, () => {
  console.log('Server in ascolto sulla porta 3000');
});
