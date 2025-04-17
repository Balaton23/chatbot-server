const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*' // CORS offen für Test, später anpassen!
}));
app.use(express.json());

// Statische Dateien aus /public
app.use(express.static(path.join(__dirname, 'public')));

// API-Routen einbinden
const chatRoute = require('./api/chat');
app.use('/api/chat', chatRoute);

// Server starten
app.listen(PORT, () => {
    console.log(`✅ Chatbot-Server aktiv unter: https://chatbot-server-1-w416.onrender.com:${PORT}`);
});
