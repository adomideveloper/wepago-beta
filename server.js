const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "2050587",
  key: process.env.PUSHER_KEY || "956911c53ec94274858e",
  secret: process.env.PUSHER_SECRET || "ceae5e634263dd47705b",
  cluster: process.env.PUSHER_CLUSTER || "mt1",
  useTLS: true
});

// Endpoint para que la app de comercios envíe un cobro a un usuario
app.post('/trigger-charge', async (req, res) => {
    const { userId, amount, merchantName, chargeId, merchantId } = req.body;
    console.log(`Cobro recibido para el usuario ${userId}`);

    try {
        await pusher.trigger(`user-${userId}`, 'new-charge', {
            amount: amount,
            merchantName: merchantName,
            chargeId: chargeId,
            merchantId: merchantId
        });
        res.status(200).send('Charge triggered successfully.');
    } catch (error) {
        console.error("Pusher trigger error on /trigger-charge:", error);
        res.status(500).send('Failed to trigger Pusher event.');
    }
});

// Endpoint para que la app de usuarios autorice un pago
app.post('/authorize-payment', async (req, res) => {
    const { chargeId, merchantId } = req.body;
    console.log(`Autorización recibida para el cobro ID ${chargeId} del comercio ${merchantId}`);
    try {
        await pusher.trigger(`commerce-${merchantId}`, 'payment-authorized', { 
            chargeId: chargeId 
        });
        res.status(200).send('Authorization event sent successfully.');
    } catch (error) {
        console.error("Pusher trigger error on /authorize-payment:", error);
        res.status(500).send('Failed to trigger Pusher event.');
    }
});

// Endpoint para que la app de usuarios rechace un pago
app.post('/reject-payment', async (req, res) => {
    const { chargeId, merchantId } = req.body;
    console.log(`Rechazo recibido para el cobro ID ${chargeId} del comercio ${merchantId}`);
    try {
        await pusher.trigger(`commerce-${merchantId}`, 'payment-rejected', { 
            chargeId: chargeId 
        });
        res.status(200).send('Rejection event sent successfully.');
    } catch (error) {
        console.error("Pusher trigger error on /reject-payment:", error);
        res.status(500).send('Failed to trigger Pusher event.');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for Vercel
module.exports = app;

