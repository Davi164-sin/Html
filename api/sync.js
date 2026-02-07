let nube = {}; 

export default function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Manejar preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        const { id } = req.query;
        
        // Si no hay ID, devolver objeto vacío
        if (!id) {
            return res.status(200).json({ ventas: [], stock: [] });
        }
        
        // Inicializar si no existe
        if (!nube[id]) {
            nube[id] = { ventas: [], stock: [] };
        }
        
        // GET: Leer datos
        if (req.method === 'GET') {
            return res.status(200).json(nube[id]);
        }
        
        // POST: Guardar datos
        if (req.method === 'POST') {
            nube[id] = req.body || { ventas: [], stock: [] };
            return res.status(200).json(nube[id]);
        }
        
        // Método no permitido
        return res.status(405).json({ error: 'Método no permitido' });
        
    } catch (error) {
        console.error('Error en sync:', error);
        return res.status(500).json({ error: 'Error interno', details: error.message });
    }
}
