let tareasTemporales = []; // Esto vive solo mientras la app está activa

export default function handler(req, res) {
    // Permisos básicos
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'GET') {
        return res.status(200).json(tareasTemporales);
    }

    if (req.method === 'POST') {
        // Guardamos lo que sea que mande el formulario
        tareasTemporales.push(req.body);
        return res.status(200).json(tareasTemporales);
    }

    if (req.method === 'DELETE') {
        tareasTemporales = [];
        return res.status(200).json([]);
    }
}
