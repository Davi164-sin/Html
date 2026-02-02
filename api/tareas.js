
let nube = {}; 

export default function handler(req, res) {
    // 1. ESTO ES LO MÁS IMPORTANTE PARA EL ERROR DE LA FOTO:
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIO
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder rápido a la verificación del navegador
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query; 

    if (!id) {
        return res.status(400).json({ error: "Falta ID" });
    }

    if (!nube[id]) nube[id] = [];

    if (req.method === 'GET') {
        return res.status(200).json(nube[id]);
    }

    if (req.method === 'POST') {
        // Si mandas un objeto solo, lo metemos en la lista
        if (!Array.isArray(req.body)) {
            nube[id].push(req.body);
        } else {
            // Si mandas la lista completa (como en aviso.html), la reemplazamos
            nube[id] = req.body;
        }
        return res.status(200).json(nube[id]);
    }

    if (req.method === 'DELETE') {
        nube[id] = [];
        return res.status(200).json({ mensaje: "Borrado" });
    }
}
