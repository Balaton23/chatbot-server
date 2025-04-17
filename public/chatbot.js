// Elemente referenzieren
const chatField = document.getElementById('chatField');
const msgContainer = document.getElementById('msgContainer');

// Nachricht absenden
async function postChatMessage() {
    const userInput = chatField.value.trim();
    if (!userInput) return;

    // Nutzer-Nachricht anzeigen
    msgContainer.innerHTML += `<div class="msg-me">${userInput}</div>`;

    try {
        // Anfrage an deinen Render-Server
        const response = await fetch('https://chatbot-server-1-w416.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Antwort LaLa');
        }

        const data = await response.json();
        const reply = data.reply;

        // Antwort anzeigen
        msgContainer.innerHTML += `<div class="msg">${reply}</div>`;

    } catch (error) {
        msgContainer.innerHTML += `<div class="msg-error">❌ Fehler: ${error.message}</div>`;
    }

    // Eingabefeld leeren
    chatField.value = '';
}
