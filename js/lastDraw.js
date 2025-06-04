fetch('data/sorteos.json')
    .then(res => res.json())
    .then(data => {
        if (!data || !data.length) return;

        const ultimo = data[0]; // El más reciente primero

        document.getElementById('last-draw-date').textContent = ultimo.fecha;
        document.getElementById('last-draw-numbers').textContent = ultimo.numeros.join(', ');
        document.getElementById('last-draw-pot').textContent = `$${ultimo.pozo.toLocaleString()} ARS`;
    })
    .catch(err => {
        console.error("Error al cargar el sorteo:", err);
        document.getElementById('last-draw-date').textContent = "Error";
        document.getElementById('last-draw-numbers').textContent = "Error";
        document.getElementById('last-draw-pot').textContent = "Error";
    });
