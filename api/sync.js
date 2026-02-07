let nube = {};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(200).json({ ventas: [], stock: [] });
  }

  if (!nube[id]) {
    nube[id] = { ventas: [], stock: [] };
  }

  if (req.method === 'GET') {
    return res.status(200).json(nube[id]);
  }

  if (req.method === 'POST') {
    nube[id] = req.body;
    return res.status(200).json(nube[id]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
