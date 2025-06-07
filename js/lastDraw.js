Promise.all([
    fetch('data/sorteos.json').then(res => res.json()),
    fetch('data/ganadores.json').then(res => res.json())
])
    .then(([sorteos, ganadores]) => {
        if (!sorteos.length || !sorteos[0].numeros || !ganadores.length) {
            throw new Error('Datos faltantes o malformados');
        }

        const sorteo = sorteos[0];
        const ganadorInfo = ganadores[0];

        const fecha = new Date(ganadorInfo.fecha);
        const fechaFormateada = fecha.toLocaleDateString('es-AR');
        const numeros = sorteo.numeros.join(', ');
        const pozo = `$${ganadorInfo.ganadores.reduce((acc, g) => acc + g.monto, 0).toLocaleString()} ARS`;

        const ganadoresHTML = ganadorInfo.ganadores.length
            ? ganadorInfo.ganadores.map(g => `${g.nombre}: $${g.monto.toLocaleString()}`).join('<br>')
            : 'Sin ganador';

        document.getElementById('last-draw-date').textContent = fechaFormateada;
        document.getElementById('last-draw-numbers').textContent = numeros;
        document.getElementById('last-draw-pot').textContent = pozo;
        document.getElementById('last-draw-winners').innerHTML = ganadoresHTML;
    })
    .catch(err => {
        console.error("Error al cargar los datos:", err);
        document.getElementById('last-draw-date').textContent = "Todavía no hubo primer sorteo";
        document.getElementById('last-draw-numbers').textContent = "Sin datos";
        document.getElementById('last-draw-pot').textContent = "Sin datos";
        document.getElementById('last-draw-winners').textContent = "Sin datos";
    });
