import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // Permisos de conexión
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const datos = await kv.get('reparaciones') || [];
            return res.status(200).json(datos);
        }

        if (req.method === 'POST') {
            const actuales = await kv.get('reparaciones') || [];
            actuales.push(req.body); 
            await kv.set('reparaciones', actuales);
            return res.status(200).json(actuales);
        }

        if (req.method === 'DELETE') {
            await kv.set('reparaciones', []);
            return res.status(200).json([]);
        }
    } catch (error) {
        // Esto nos dirá en la consola de Vercel qué pasó exactamente
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    }
