import { Router } from 'express';
import { createBrowserClient } from "@supabase/ssr"
import fetch from "node-fetch";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyAKbYTexLdi4TRsyuXZZ0nNOiY3Pz0RNiQ");

export const supabaseClient = createBrowserClient(
    "https://segwpauegxdqyfolvqrd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlZ3dwYXVlZ3hkcXlmb2x2cXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjQxMzQsImV4cCI6MjAzMTgwMDEzNH0.8V-VAfb2983I8RkqEPHc5t7YyxbbBFbbjZb2eCnEGRE")
const router = Router();

router.get('/data', (req, res) => {
    res.json({ message: 'Hello from /data endpoint!' });
});

router.post('/getData', async (req, res) => {
    const receivedData = req.body;
    console.log('Received data:', receivedData);
    const contentId = undefined;

    try {
        const { data: existingData, error: fetchError } = await supabaseClient
            .from('content')
            .select('*')
            .eq('content', receivedData)
            .single();

        if (fetchError) {
            console.error('Error fetching data:', fetchError);
            return res.status(500).json({ message: 'Error checking existing data', error: fetchError });
        }

        if (existingData) {
            return res.status(409).json({ message: 'Data already exists', data: existingData });
        }

        const { data, error: insertError } = await supabaseClient
            .from('content')
            .insert({"content": receivedData});

        if (insertError) {
            console.error('Error inserting data:', insertError);
            return res.status(500).json({ message: 'Failed to insert data', error: insertError });
        }

        res.json({ message: 'Data received and inserted successfully', data });

        contentId = data[0].id;
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error', error });
    }

    router.post("/getUrl", async (req, res) => {
        const receivedUrl = req.body;
        console.log('Received data:', receivedUrl);

        const { data: webData, error: webError } = await supabase
        .from('webs')
        .insert([
        { url: receivedUrl, content_id: contentId }
        ]);

        if (webError) {
            console.error('Error al insertar URL:', webError);
            return res.status(500).json({ message: 'Error checking existing data', error: webError });
        }

        console.log('Datos insertados con éxito:', webData);
        res.json({ message: 'Data received and inserted successfully', webData });
    })
});

router.post('/getDataIa', async (req, res) => {
    const { message } = req.body;
    console.log('Received message:', message);

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent([message]);
        const responseText = result.response.text();
        console.log(responseText);

        // Limpiar caracteres especiales
        const cleanedResponse = responseText.replace(/[*#]/g, '');

        // Limitar a un máximo de 5 renglones
        const maxLines = 5;
        const lines = cleanedResponse.split('\n'); // Dividir la respuesta en renglones
        const limitedResponse = lines.slice(0, maxLines).join('\n'); // Tomar solo los primeros 5 renglones

        // Devuelve la respuesta generada
        res.json({ response: limitedResponse });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content' });
    }
});


router.get('/getDataFromDB', async (req, res) => {
    try {
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

        res.json(data[0]);
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Unexpected error', error });
    }
});

export default router;
