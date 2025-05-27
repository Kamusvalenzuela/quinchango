document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("jugadaForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = {
                num1: form.num1.value,
                num2: form.num2.value,
                num3: form.num3.value,
                num4: form.num4.value,
                num5: form.num5.value
            };

            fetch("https://script.google.com/macros/s/AKfycbxoZz3YKa8XW2WW3dze0ChpIlfTfjGrsexsyH96jVpNaEfhFh0eqPrhFXQdb93HTLzT/exec", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.text())
                .then(result => {
                    if (result === "OK") {
                        window.location.href = "success.html";
                    } else {
                        alert("Error al registrar la jugada. Intenta nuevamente.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Error al conectar con el servidor.");
                });
        });
    }
});