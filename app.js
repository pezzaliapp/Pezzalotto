document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("results").innerHTML = "<p>Caricamento dati...</p>";
    
    fetch("probability-data.json")
    .then(response => response.json())
    .then(data => {
        let resultHTML = "<h2>Probabilità per Ruota</h2>";
        
        Object.keys(data).forEach(ruota => {
            resultHTML += `<h3>${ruota}</h3>`;
            resultHTML += "<table border='1'><tr><th>Numero</th><th>Probabilità</th></tr>";
            
            let sortedNumbers = Object.entries(data[ruota])
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5); // Prendiamo i 5 numeri con la probabilità più alta
            
            sortedNumbers.forEach(([numero, probabilita]) => {
                resultHTML += `<tr><td>${numero}</td><td>${(probabilita * 100).toFixed(2)}%</td></tr>`;
            });
            
            resultHTML += "</table><br>";
        });
        
        document.getElementById("results").innerHTML = resultHTML;
        
        // Suggerire i numeri da giocare sulla base della data attuale
        let today = new Date().toISOString().split("T")[0];
        let suggestedNumbers = [];
        
        Object.keys(data).forEach(ruota => {
            let topNumbers = Object.entries(data[ruota])
                .sort((a, b) => b[1] - a[1])
                .slice(0, 2); // Prendiamo i 2 numeri più probabili per ogni ruota
            
            suggestedNumbers.push({ ruota, numeri: topNumbers.map(n => n[0]) });
        });
        
        let suggestionHTML = "<h2>Numeri consigliati da giocare per " + today + "</h2><ul>";
        suggestedNumbers.forEach(suggestion => {
            suggestionHTML += `<li><strong>${suggestion.ruota}:</strong> ${suggestion.numeri.join(", ")}</li>`;
        });
        suggestionHTML += "</ul>";
        
        document.getElementById("results").innerHTML += suggestionHTML;
    })
    .catch(error => {
        document.getElementById("results").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        console.error("Errore nel caricamento dei dati:", error);
    });
});
