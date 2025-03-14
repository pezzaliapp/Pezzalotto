document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("results").innerHTML = "<p>Caricamento dati...</p>";
    
    fetch("probability-data.json")
    .then(response => response.json())
    .then(data => {
        let resultHTML = "<h2>Probabilità per Ruota</h2>";
        
        Object.keys(data).forEach(ruota => {
            resultHTML += `<h3>${ruota}</h3>`;
            resultHTML += "<table border='1'><tr><th>Numero</th><th>Probabilità</th></tr>";
            
            Object.keys(data[ruota]).forEach(numero => {
                resultHTML += `<tr><td>${numero}</td><td>${(data[ruota][numero] * 100).toFixed(2)}%</td></tr>`;
            });
            
            resultHTML += "</table><br>";
        });
        
        document.getElementById("results").innerHTML = resultHTML;
    })
    .catch(error => {
        document.getElementById("results").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        console.error("Errore nel caricamento dei dati:", error);
    });
});
