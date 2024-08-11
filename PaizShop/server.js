const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

app.post('/api/purchase', async (req, res) => {
    const { name, email, item } = req.body;

    // Discord Webhook URL (replace with your webhook URL)
    const discordWebhookUrl = 'https://discord.com/api/webhooks/your-webhook-id/your-webhook-token';

    // Send message to Discord
    try {
        await axios.post(discordWebhookUrl, {
            content: `New Purchase:\nName: ${name}\nEmail: ${email}\nItem: ${item}`,
        });
        res.status(200).send('Purchase complete');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Error completing purchase');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
