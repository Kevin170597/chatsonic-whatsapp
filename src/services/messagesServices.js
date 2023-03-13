const axios = require('axios');

const sendMessageService = async (text, phoneNumber) => {
    try {
        const req = await axios.post(process.env.WPP_MESSAGE_URL, {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "text",
            text: {
                body: text
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.WPP_API_KEY
            }
        });
        console.log(req.data);
    } catch (error) {
        console.log(error);
    }
};

const sendImageService = async (url, phoneNumber) => {
    try {
        const req = await axios.post(process.env.WPP_MESSAGE_URL, {
            messaging_product: "whatsapp",
            to: phoneNumber,
            type: "image",
            image: {
                link: url
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.WPP_API_KEY
            }
        });
        console.log(req.data);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { sendMessageService, sendImageService };