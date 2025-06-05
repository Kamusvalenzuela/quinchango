const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const PARTICIPANTES_PATH = path.join(__dirname, 'data', 'participantes.json');

app.use(cors());
app.use(express.json());

app.post('/agregar', (req, res) => {
    const { nombre, numeros } = req.body;

    if (!nombre || !Array.isArray(numeros) || numeros.length !== 5) {
        return res.status(400).send('Datos inválidos.');
    }

    try {
        const data = fs.existsSync(PARTICIPANTES_PATH) ? JSON.parse(fs.readFileSync(PARTICIPANTES_PATH)) : [];
        data.push({ nombre, numeros });
        fs.writeFileSync(PARTICIPANTES_PATH, JSON.stringify(data, null, 2));
        res.send('¡Participante agregado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al guardar.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
