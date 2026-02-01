let tasks = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { nombre } = req.body;
    if (nombre) {
      tasks.push({ nombre, id: Date.now() });
    }
    return res.status(200).json(tasks);
  } else {
    res.status(405).end();
  }
}
