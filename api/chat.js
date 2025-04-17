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
                        content: 'Du bist ein freundlicher älterer Herr, der fürsorglich antwortet und auch nach dem Wohlbefinden fragt.'
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
        res.json({ reply: data.choices[0].message.content.trim() });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fehler beim Abrufen der Antwort.' });
    }
});

module.exports = router;
