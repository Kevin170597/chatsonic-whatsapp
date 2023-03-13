const validate = (body) => {
    if (body != undefined) {
        if (body?.entry[0]?.changes[0]?.value?.messages) {
            console.log(body.entry[0].changes[0].value.messages);
            return {
                messageContent: body?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body,
                phoneNumber: '54' + (body?.entry[0]?.changes[0]?.value?.messages[0]?.from).slice(3)
            }
        }
    } else { return false }
};

module.exports = { validate };