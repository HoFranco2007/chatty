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
        /* if (message.includes("como")){
            const response = await fetch('http://localhost:8000/accion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Error al hacer la petición al servidor Python');
            }

            const pythonResponse = await response.json();

            return res.json({ response: pythonResponse.response });
        } */
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent([`Responde en español: ${message}`]);
        const responseText = result.response.text();

        const cleanedResponse = responseText.replace(/[*#]/g, '');

        const maxLines = 5;
        const lines = cleanedResponse.split('\n');
        const limitedResponse = lines.slice(0, maxLines).join('\n');


        res.json({ response: limitedResponse });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Error generating content' });
    }
});

router.post("/getHtml", async (req, res) => {
    const { html } = req.body;

    console.log('HTML recibido:', html);

    try {
        const { data, error } = await supabaseClient
            .from("webs")
            .select("content_id")
            .eq("url", "https://github.com/");

        if (error) {
            console.error("Error al obtener content_id:", error);
            return res.status(500).json({ message: "Error al obtener content_id" });
        }

        const content_id = data[0]?.content_id;
        if (!content_id) {
            return res.status(404).json({ message: "No se encontró content_id" });
        }

        console.log(content_id);

        // Obtener la información relacionada con el content_id
        const { data: dataWeb, error: errorWeb } = await supabaseClient
            .from("content")
            .select("content_analized, index")
            .eq("id", content_id);

        if (errorWeb) {
            console.error("Error al obtener datos de content:", errorWeb);
            return res.status(500).json({ message: "Error al obtener datos de content" });
        }

        if (!dataWeb || dataWeb.length === 0) {
            return res.status(404).json({ message: "No se encontró contenido analizado" });
        }

        let content_analized = dataWeb[0].content_analized.split(", ");
        let index = dataWeb[0].index;

        console.log("Contenido analizado:", content_analized);
        console.log("Índice actual:", index);

        // Lógica para actualizar el índice y retornar el contenido correspondiente
        if (index === 0) {
            index += 1;
            console.log("Nuevo índice:", index);

            const { data: dataIndex, error: errorIndex } = await supabaseClient
                .from("content")
                .update({ index })
                .eq("id", content_id);

            if (errorIndex) {
                console.error("Error al actualizar el índice:", errorIndex);
                return res.status(500).json({ message: "Error al actualizar el índice" });
            }

            console.log("Índice actualizado:", dataIndex);
            return res.status(200).json({ content: content_analized[0] });
        } else if (index === 1) {
            index += 1;
            const { data: dataIndex, error: errorIndex } = await supabaseClient
                .from("content")
                .update({ index })
                .eq("id", content_id);

            if (errorIndex) {
                console.error("Error al actualizar el índice:", errorIndex);
                return res.status(500).json({ message: "Error al actualizar el índice" });
            }

            console.log("Índice actualizado:", dataIndex);
            return res.status(200).json({ content: content_analized[1] });
        } else {
            index = 0;
            const { data: dataIndex, error: errorIndex } = await supabaseClient
                .from("content")
                .update({ index })
                .eq("id", content_id);

            if (errorIndex) {
                console.error("Error al actualizar el índice:", errorIndex);
                return res.status(500).json({ message: "Error al actualizar el índice" });
            }

            console.log("Índice actualizado:", dataIndex);
            return res.status(200).json({ content: content_analized[2] });
        }

    } catch (error) {
        console.error('Error al enviar HTML al servidor Python:', error);
        return res.status(500).json({ message: 'Error al enviar HTML al servidor Python', error });
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
