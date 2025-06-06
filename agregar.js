
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const paths = {
    participantes: path.join(__dirname, 'data', 'participantes.json'),
    sorteos: path.join(__dirname, 'data', 'sorteos.json'),
    ganadores: path.join(__dirname, 'data', 'ganadores.json')
};

function mainMenu() {
    console.log("\n¿Qué querés hacer?");
    console.log("1) Administrar Participantes");
    console.log("2) Agregar resultado de sorteo");
    console.log("3) Registrar Ganadores");
    console.log("0) Salir");

    rl.question("> ", choice => {
        switch (choice) {
            case '1': participantesMenu(); break;
            case '2': agregarSorteo(); break;
            case '3': agregarGanador(); break;
            case '0': rl.close(); break;
            default: console.log("Opción inválida"); mainMenu();
        }
    });
}

function participantesMenu() {
    console.log("\n1) Limpiar lista y configurar nuevo monto");
    console.log("2) Añadir participante");
    console.log("0) Volver");

    rl.question("> ", choice => {
        switch (choice) {
            case '1':
                rl.question("Monto del premio: ", monto => {
                    const data = { premio: parseInt(monto), participantes: [] };
                    fs.writeFileSync(paths.participantes, JSON.stringify(data, null, 2));
                    console.log("Participantes reseteados.");
                    mainMenu();
                });
                break;
            case '2':
                rl.question("Nombre del participante: ", nombre => {
                    rl.question("5 números separados por coma: ", numeros => {
                        const parsedNumeros = numeros.split(',').map(n => parseInt(n.trim()));
                        const rawData = fs.readFileSync(paths.participantes);
                        const data = JSON.parse(rawData);
                        data.participantes.push({ nombre, numeros: parsedNumeros });
                        fs.writeFileSync(paths.participantes, JSON.stringify(data, null, 2));
                        console.log("Participante agregado.");
                        mainMenu();
                    });
                });
                break;
            case '0': mainMenu(); break;
            default: console.log("Opción inválida"); participantesMenu();
        }
    });
}

function agregarSorteo() {
    rl.question("Resultados del sorteo (5 números separados por coma): ", entrada => {
        const numeros = entrada.split(',').map(n => parseInt(n.trim()));
        const sorteos = fs.existsSync(paths.sorteos) ? JSON.parse(fs.readFileSync(paths.sorteos)) : [];
        sorteos.push({ fecha: new Date().toISOString(), numeros });
        fs.writeFileSync(paths.sorteos, JSON.stringify(sorteos, null, 2));
        console.log("Sorteo agregado.");
        mainMenu();
    });
}

function agregarGanador() {
    rl.question("Nombres de los ganadores (separados por coma): ", nombresInput => {
        const nombres = nombresInput.split(',').map(n => n.trim());

        rl.question("Monto para cada uno: ", montoInput => {
            const monto = parseInt(montoInput);
            const ganadores = fs.existsSync(paths.ganadores) ? JSON.parse(fs.readFileSync(paths.ganadores)) : [];

            const entrada = {
                fecha: new Date().toISOString(),
                ganadores: nombres.map(nombre => ({
                    nombre,
                    monto
                }))
            };

            ganadores.push(entrada);
            fs.writeFileSync(paths.ganadores, JSON.stringify(ganadores, null, 2));
            console.log("Ganadores registrados correctamente.");
            mainMenu();
        });
    });
}

mainMenu();
