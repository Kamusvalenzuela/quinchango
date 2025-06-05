const fs = require('fs');
const path = require('path');
const readline = require('readline');

const archivoJSON = path.join(__dirname, 'data', 'participantes.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta, resolve));
}

(async () => {
    if (!fs.existsSync(archivoJSON)) {
        console.log('❌ No se encontró participantes.json');
        rl.close();
        return;
    }

    const data = JSON.parse(fs.readFileSync(archivoJSON, 'utf8'));
    if (!data.participantes) data.participantes = [];

    const nombre = await preguntar("Nombre del participante: ");
    const numerosStr = await preguntar("5 números del 1 al 49 separados por coma: ");
    const numeros = numerosStr
        .split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n) && n >= 1 && n <= 49);

    if (numeros.length !== 5 || new Set(numeros).size !== 5) {
        console.log("❌ Los números deben ser 5, únicos y entre 1 y 49.");
        rl.close();
        return;
    }

    data.participantes.push({ nombre, numeros });
    fs.writeFileSync(archivoJSON, JSON.stringify(data, null, 2));
    console.log(`✅ Participante "${nombre}" agregado correctamente.`);

    rl.close();
})();
