const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

// Endpoint para que la app de comercios envíe un nuevo cobro
app.post('/trigger-charge', (req, res) => {
    const { userId, amount, merchantName, chargeId, merchantId } = req.body;
    const userChannel = `user-${userId}`;
    const event = 'new-charge';
    const payload = { 
        amount, 
        merchantName, 
        id: chargeId, 
        merchantId 
    };

    pusher.trigger(userChannel, event, payload)
        .then(() => res.status(200).send('Cobro enviado al usuario'))
        .catch(error => {
            console.error('Error enviando a Pusher:', error);
            res.status(500).send('Error enviando el cobro');
        });
});

// Endpoint para que la app de usuarios autorice un pago
app.post('/authorize-payment', (req, res) => {
    const { chargeId, merchantId } = req.body;
    const commerceChannel = `commerce-${merchantId}`;
    const event = 'payment-authorized';
    const payload = { chargeId };
    
    pusher.trigger(commerceChannel, event, payload)
        .then(() => res.status(200).send('Autorización de pago enviada al comercio'))
        .catch(error => {
            console.error('Error enviando a Pusher:', error);
            res.status(500).send('Error enviando la autorización');
        });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// Export the app for Vercel
module.exports = app;

