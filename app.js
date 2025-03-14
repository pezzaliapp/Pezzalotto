document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("results").innerHTML = "<p>Caricamento dati...</p>";
    
    fetch("probability-data.json")
    .then(response => response.json())
    .then(data => {
        let resultHTML = "<h2>Analisi Statistica dei Numeri</h2>";
        
        // Nuovi nomi delle città internazionali
        const cittaMappate = {
            "Bari": "New York",
            "Cagliari": "Tokyo",
            "Firenze": "Sydney",
            "Genova": "Londra",
            "Milano": "Parigi",
            "Napoli": "Berlino",
            "Palermo": "Toronto",
            "Roma": "Dubai",
            "Torino": "San Francisco",
            "Venezia": "Singapore",
            "Nazionale": "Hong Kong"
        };

        Object.keys(data).forEach(citta => {
            let cittaNuova = cittaMappate[citta] || citta; // Sostituisce il nome se presente nella mappa
            resultHTML += `<h3>${cittaNuova}</h3>`;
            resultHTML += "<table border='1'><tr><th>Numero</th><th>Probabilità</th></tr>";
            
            let sortedNumbers = Object.entries(data[citta])
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5); // Prendiamo i 5 numeri con la probabilità più alta
            
            sortedNumbers.forEach(([numero, probabilita]) => {
                resultHTML += `<tr><td>${numero}</td><td>${(probabilita * 100).toFixed(2)}%</td></tr>`;
            });
            
            resultHTML += "</table><br>";
        });
        
        document.getElementById("results").innerHTML = resultHTML;
        
        // Suggerire i numeri più frequenti sulla base della data attuale
        let today = new Date().toISOString().split("T")[0];
        let suggestedNumbers = [];
        
        Object.keys(data).forEach(citta => {
            let cittaNuova = cittaMappate[citta] || citta;
            let topNumbers = Object.entries(data[citta])
                .sort((a, b) => b[1] - a[1])
                .slice(0, 2); // Prendiamo i 2 numeri più frequenti per ogni città
            
            suggestedNumbers.push({ citta: cittaNuova, numeri: topNumbers.map(n => n[0]) });
        });
        
        let suggestionHTML = "<h2>Distribuzione Numerica per " + today + "</h2><ul>";
        suggestedNumbers.forEach(suggestion => {
            suggestionHTML += `<li><strong>${suggestion.citta}:</strong> ${suggestion.numeri.join(", ")}</li>`;
        });
        suggestionHTML += "</ul>";
        
        // Messaggio di tutela e chiarimento
        let disclaimer = "<p><strong>Nota:</strong> Questo programma utilizza dati statistici e algoritmi matematici per analizzare la distribuzione dei numeri nel tempo. Non effettua previsioni né suggerisce scelte. L'obiettivo è esclusivamente didattico e formativo, dimostrando l'applicazione del calcolo delle probabilità nell'analisi dei dati. Qualsiasi interpretazione soggettiva o utilizzo per scopi diversi dall’analisi statistica non è responsabilità dell'autore. Pezzalotto è un'app gratuita e open source rilasciata sotto licenza MIT.</p>";
        
        // Pulsante per esportare i risultati in TXT via WhatsApp
        let exportButton = `<button onclick="sendWhatsApp()">Invia analisi via WhatsApp</button>`;
        
        document.getElementById("results").innerHTML += suggestionHTML + disclaimer + exportButton;
    })
    .catch(error => {
        document.getElementById("results").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        console.error("Errore nel caricamento dei dati:", error);
    });
});

// Funzione per generare il testo e inviarlo via WhatsApp
function sendWhatsApp() {
    let text = "Distribuzione Numerica di oggi:\n";
    document.querySelectorAll("ul li").forEach(li => {
        text += li.innerText + "\n";
    });
    text += "\nNota: Questa analisi è basata su dati statistici e algoritmi matematici e non rappresenta alcuna previsione. Pezzalotto è un'app gratuita e open source rilasciata sotto licenza MIT.";
    
    let url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
}
