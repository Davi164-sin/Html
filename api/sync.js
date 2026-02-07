let nube = {}; 

export default function handler(req, res) {
    // Permisos para que cualquier app se conecte sin errores
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Responder a la verificación de conexión
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { id } = req.query;
    
    // Si no hay ID, devolvemos lista vacía
    if (!id) {
        return res.status(200).json([]);
    }
    
    // Si el ID no existe en la nube, lo creamos vacío
    if (!nube[id]) {
        nube[id] = [];
    }
    
    // MÉTODO GET: Leer los datos
    if (req.method === 'GET') {
        return res.status(200).json(nube[id]);
    }
    
    // MÉTODO POST: Guardar los datos
    if (req.method === 'POST') {
        nube[id] = req.body;
        return res.status(200).json(nube[id]);
    }
}
```

### **3. Despliega el cambio en Vercel**

Después de crear el archivo, Vercel lo desplegará automáticamente.

### **4. Verifica que funcione**

Abre en tu navegador:
```
https://html-three-nu.vercel.app/api/sync?id=test
```

Debería mostrar: `[]`

---

## ✅ **Entonces la URL completa será:**
```
https://html-three-nu.vercel.app/api/sync
