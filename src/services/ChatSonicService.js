const axios = require('axios');
const messagesServices = require('./messagesServices');

const askToSonic = async (prompt, phoneNumber) => {
    try {
        const req = await axios.post(process.env.CHATSONIC_URL, {
            enable_google_results: true,
            enable_memory: false,
            input_text: prompt
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.CHATSONIC_API_KEY
            }
        });
        console.log(req.data);
        req.data.image_urls.length > 0 ? 
        req.data.image_urls.map(async (url) => {
            await messagesServices.sendImageService(url, phoneNumber);
        }) :
        await messagesServices.sendMessageService(req.data.message, phoneNumber);
    } catch (error) {
        console.log(error);
        await messagesServices.sendMessageService('Algo salió mal. Intenta más tarde.', phoneNumber);
    }
};

module.exports = { askToSonic };