let nube = {};

export default function handler(req, res) {
    // 🔥 HEADERS CORS CORRECTOS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 🔥 RESPUESTA AL PREFLIGHT
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Falta ID' });
    }

    if (!nube[id]) nube[id] = [];

    if (req.method === 'GET') {
        return res.status(200).json(nube[id]);
    }

    if (req.method === 'POST') {
        if (!Array.isArray(req.body)) {
            nube[id].push(req.body);
        } else {
            nube[id] = req.body;
        }
        return res.status(200).json(nube[id]);
    }

    if (req.method === 'DELETE') {
        nube[id] = [];
        return res.status(200).json({ mensaje: 'Borrado' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
                          }
