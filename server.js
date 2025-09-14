// Importar las dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const cors = require('cors');

// Crear una instancia de la aplicación Express
const app = express();

// Configurar middlewares
app.use(cors()); // Habilitar Cross-Origin Resource Sharing para permitir peticiones desde el frontend
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar el cliente de Pusher usando variables de entorno para mayor seguridad
// Estas variables se configurarán en el panel de Vercel.
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

// Definir el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// === ENDPOINTS DE LA API ===

/**
 * Endpoint para que la app de COMERCIO envíe un nuevo cobro.
 * Recibe: { userId, amount, merchantName, chargeId }
 * Dispara un evento 'new-charge' al canal del usuario específico (ej: 'user-E1000').
 */
app.post('/trigger-charge', (req, res) => {
  const { userId, amount, merchantName, chargeId } = req.body;

  if (!userId || !amount || !merchantName || !chargeId) {
    return res.status(400).send('Faltan datos requeridos: userId, amount, merchantName, chargeId.');
  }

  const payload = {
    id: chargeId,
    merchantName: merchantName,
    amount: amount,
  };

  // El canal es específico para cada usuario.
  const userChannel = `user-${userId}`;

  console.log(`Disparando evento 'new-charge' al canal '${userChannel}' con payload:`, payload);

  // Disparar el evento usando Pusher
  pusher.trigger(userChannel, 'new-charge', payload)
    .then(() => {
      res.status(200).send('Cobro enviado al usuario exitosamente.');
    })
    .catch(error => {
      console.error('Error al disparar evento de Pusher:', error);
      res.status(500).send('Error interno al procesar el cobro.');
    });
});

/**
 * Endpoint para que la app de USUARIO autorice un pago.
 * Recibe: { chargeId, merchantId }
 * Dispara un evento 'payment-authorized' al canal del comercio específico (ej: 'commerce-SBRD7805').
 */
app.post('/authorize-payment', (req, res) => {
  const { chargeId, merchantId } = req.body;

  if (!chargeId || !merchantId) {
    return res.status(400).send('Faltan datos requeridos: chargeId, merchantId.');
  }

  const payload = {
    chargeId: chargeId,
  };

  // El canal es específico para cada comercio.
  const commerceChannel = `commerce-${merchantId}`;

  console.log(`Disparando evento 'payment-authorized' al canal '${commerceChannel}' con payload:`, payload);
  
  // Disparar el evento usando Pusher
  pusher.trigger(commerceChannel, 'payment-authorized', payload)
    .then(() => {
      res.status(200).send('Autorización de pago enviada al comercio.');
    })
    .catch(error => {
      console.error('Error al disparar evento de Pusher:', error);
      res.status(500).send('Error interno al procesar la autorización.');
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de Wepago corriendo en el puerto ${PORT}`);
});

