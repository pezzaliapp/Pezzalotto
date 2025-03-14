document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("results").innerHTML = "<p>Caricamento dati...</p>";
    
    fetch("probability-data.json")
    .then(response => response.json())
    .then(data => {
        let resultHTML = "<h2>Probabilità per Ruota</h2><ul>";
        Object.keys(data).forEach(ruota => {
            resultHTML += `<li><strong>${ruota}:</strong> ${JSON.stringify(data[ruota])}</li>`;
        });
        resultHTML += "</ul>";
        document.getElementById("results").innerHTML = resultHTML;
    })
    .catch(error => {
        document.getElementById("results").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        console.error("Errore nel caricamento dei dati:", error);
    });
});
