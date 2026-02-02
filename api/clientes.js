// CONFIGURACIÓN ÚNICA PARA CADA CLIENTE
const MI_ID = 'cliente_juan_pro'; // Cambia esto para cada cliente diferente
const API_URL = `https://html-iovrprmh4-david-s-projects-fe8f3f6b.vercel.app/api/tareas?id=${cliente_juan}`;

// 1. GUARDAR DATOS (Celular)
async function guardarDatos(listaCompleta) {
    // Guardar en el teléfono (Seguridad total)
    localStorage.setItem('respaldo_local', JSON.stringify(listaCompleta));

    // Intentar mandar a la PC vía API
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listaCompleta)
        });
        console.log("Sincronizado con la nube");
    } catch (e) {
        console.log("Guardado solo local (sin internet)");
    }
}

// 2. CARGAR DATOS (PC o Celular al abrir)
async function cargarDatos() {
    try {
        const res = await fetch(API_URL);
        const desdeNube = await res.json();
        
        if (desdeNube.length > 0) {
            renderizar(desdeNube);
            localStorage.setItem('respaldo_local', JSON.stringify(desdeNube));
        } else {
            // Si la nube está vacía (se reinició), recuperamos del LocalStorage
            const local = JSON.parse(localStorage.getItem('respaldo_local') || '[]');
            renderizar(local);
            // Re-subimos a la nube para que la PC lo vea
            if(local.length > 0) guardarDatos(local);
        }
    } catch (e) {
        // Si no hay internet, cargamos lo que haya en el teléfono
        const local = JSON.parse(localStorage.getItem('respaldo_local') || '[]');
        renderizar(local);
    }
}
