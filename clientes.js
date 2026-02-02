// CONFIGURACIÓN ÚNICA PARA CADA CLIENTE
const MI_ID = 'cliente_juan_pro'; // Cambia esto para cada cliente diferente
// REEMPLAZA ESTA URL CON LA TUYA DE VERCEL (Asegúrate de que termine en ?id=${MI_ID})
const API_URL = `https://html-iovrprmh4-david-s-projects-fe8f3f6b.vercel.app/api/tareas?id=cliente_juan_pro`;

// 1. GUARDAR DATOS (Se activa cada vez que agregas o cambias algo)
async function guardarDatos(listaCompleta) {
    // Primero guardamos en el teléfono (LocalStorage) por seguridad
    localStorage.setItem('respaldo_local', JSON.stringify(listaCompleta));

    // Intentamos mandarlo a la API para que la PC pueda verlo
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(listaCompleta)
        });
        
        if (respuesta.ok) {
            console.log("✅ Sincronizado con la nube con éxito");
        } else {
            console.log("⚠️ Error en la API (ID posiblemente faltante)");
        }
    } catch (e) {
        console.log("📡 Sin internet: Guardado solo localmente");
    }
}

// 2. CARGAR DATOS (Se activa al abrir la página o al refrescar)
async function cargarDatos() {
    try {
        const res = await fetch(API_URL);
        const desdeNube = await res.json();

        // Si la API tiene datos, los usamos y actualizamos el LocalStorage
        if (desdeNube && desdeNube.length > 0) {
            console.log("☁️ Datos cargados desde la nube");
            renderizar(desdeNube); // Esta función es la que dibuja tus tareas/clientes
            localStorage.setItem('respaldo_local', JSON.stringify(desdeNube));
        } else {
            // Si la nube está vacía (ej. se reinició el servidor), usamos el LocalStorage
            console.log("💾 Nube vacía, recuperando respaldo local...");
            const local = JSON.parse(localStorage.getItem('respaldo_local') || '[]');
            renderizar(local);
            
            // Si recuperamos algo local, lo re-subimos a la nube para que la PC lo vea
            if (local.length > 0) {
                guardarDatos(local);
            }
        }
    } catch (e) {
        console.log("🔌 Error de conexión: Usando datos locales");
        const local = JSON.parse(localStorage.getItem('respaldo_local') || '[]');
        renderizar(local);
    }
}

// Llama a cargarDatos() cuando la página termine de cargar
window.onload = cargarDatos;
