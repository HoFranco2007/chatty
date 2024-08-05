const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint para recibir datos
app.post('/highlight', (req, res) => {
    const { text } = req.body;
    console.log(`Received text: ${text}`);
    // Aquí puedes procesar el texto o hacer lo que necesites
    res.send({ status: 'success' });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
