let tasks = [];
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { nombre } = req.body;
    if (nombre) tasks.push({ nombre });
    res.status(200).json(tasks);
  }
}
