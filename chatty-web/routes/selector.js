import { Router } from 'express';
import { createBrowserClient } from "@supabase/ssr"

export const supabaseClient = createBrowserClient(
    "https://segwpauegxdqyfolvqrd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZ3dwYXVlZ3hkcXlmb2x2cXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjQxMzQsImV4cCI6MjAzMTgwMDEzNH0.8V-VAfb2983I8RkqEPHc5t7YyxbbBFbbjZb2eCnEGRE")
const router = Router();

// Define your routes here
router.get('/data', (req, res) => {
    res.json({ message: 'Hello from /data endpoint!' });
});

router.post('/getData', async (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);

    try {
        // Buscar si el dato ya existe en la tabla
        const { data: existingData, error: fetchError } = await supabaseClient
            .from('content')
            .select('*')
            .eq('content', receivedData)
            .single(); // Asumiendo que solo debería haber un resultado

        if (fetchError) {
            console.error('Error fetching data:', fetchError);
            return res.status(500).json({ message: 'Error checking existing data', error: fetchError });
        }

        // Si el dato ya existe, enviar una respuesta indicando que ya existe
        if (existingData) {
            return res.status(409).json({ message: 'Data already exists', data: existingData });
        }

        // Si el dato no existe, realizar la inserción
        const { data, error: insertError } = await supabaseClient
            .from('content')
            .insert({"content": receivedData});

        if (insertError) {
            console.error('Error inserting data:', insertError);
            return res.status(500).json({ message: 'Failed to insert data', error: insertError });
        }

        // Envía una respuesta confirmando la inserción
        res.json({ message: 'Data received and inserted successfully', data });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error', error });
    }
});

router.get('/getDataFromDB', async (req, res) => {
    try {
        // Recupera el último dato insertado en la tabla "content"
        const { data, error } = await supabaseClient
            .from('content')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ message: 'Failed to fetch data', error });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found in the content table' });
        }

        // Envía el último registro recuperado como respuesta
        res.json(data[0]);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error', error });
    }
});

export default router;
