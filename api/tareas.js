import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    // Permisos para que cualquier dispositivo se conecte
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const tareas = await kv.get('lista_maestra') || [];
            return res.status(200).json(tareas);
        }

        if (req.method === 'POST') {
            const actuales = await kv.get('lista_maestra') || [];
            // Esto acepta tanto "nombre" como los datos del cliente (cli, mod, pre)
            actuales.push(req.body); 
            await kv.set('lista_maestra', actuales);
            return res.status(200).json(actuales);
        }

        if (req.method === 'DELETE') {
            await kv.set('lista_maestra', []);
            return res.status(200).json([]);
        }
    } catch (e) {
        return res.status(500).json({ error: "Error de base de datos" });
    }
}
