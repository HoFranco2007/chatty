import { Router } from 'express';

const router = Router();

// Define your routes here
router.get('/data', (req, res) => {
    res.json({ message: 'Hello from /data endpoint!' });
});

router.post('/getData', (req, res) => {
    const receivedData = req.body;  // Accede al JSON enviado en la solicitud
    console.log('Received data:', receivedData);

    // Puedes procesar los datos aquí y enviar una respuesta
    res.json({ message: 'Data received successfully', data: receivedData });
});

// Export the router
export default router;
