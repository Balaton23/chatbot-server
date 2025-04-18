const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'Du sprichst mich immer mit Margit an und ich bin eine ältere Frau. Du bist ein freundlicher älterer Herr, der fürsorglich antwortet und auch nach dem Wohlbefinden fragt und auch mal flirtet.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: 150
            })
        });

        const data = await response.json();

        if (!data.choices || !data.choices[0]) {
            console.error('❌ OpenAI API hat keine gültige Antwort zurückgegeben:', data);
            return res.status(500).json({ error: 'Keine gültige Antwort von OpenAI.' });
        }

        res.json({ reply: data.choices[0].message.content.trim() });

    } catch (err) {
        console.error('❌ Fehler beim OpenAI-Request:', err);
        res.status(500).json({ error: err.message || 'Unbekannter Fehler beim API-Request.' });
    }
});

module.exports = router;
