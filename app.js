require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.json());

const webhookRouter = require('./src/routes/webhook');

app.use('/webhook', webhookRouter);

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));