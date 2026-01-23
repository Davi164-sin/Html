let tasks = [];
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    return res.status(200).json(tasks);
  } 
  
  if (req.method === 'POST') {
    const { nombre } = req.body;
    if (nombre) tasks.push({ nombre });
    return res.status(200).json(tasks);
  } 
  
  if (req.method === 'DELETE') {
    tasks.length = 0; // Esto vacía el array sí o sí
    return res.status(200).json([]);
  }

  return res.status(405).end();
}
