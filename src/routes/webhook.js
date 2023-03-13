const express = require('express');
const router = express.Router();
const ChatSonicService = require('../services/ChatSonicService');
const validateWebhook = require('../utils/webhookValidations');

// Verify webhook in Meta
router.get('/', (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];

    const myToken = process.env.WEBHOOK_TOKEN;

    if (mode && token) {
        if (mode === 'subscribe' && token === myToken) {
            res.status(200).send(challenge);
        } else {
            res.status(403);
        }
    }
});

// Listening whatsapp messages events
router.post('/', async (req, res) => {
    let validate = validateWebhook.validate(req.body);
    //console.log(validate);
    if (!validate) return null;
    ChatSonicService.askToSonic(validate.messageContent, validate.phoneNumber);
});

module.exports = router;