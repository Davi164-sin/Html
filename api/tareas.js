const API_URL = '/API/tareas?tipo=codigo';

// Función para SUBIR el código a la nube
async function cloudSave() {
    const proyecto = {
        html: editors.html.value,
        css: editors.css.value,
        js: editors.js.value,
        fecha: new Date().toLocaleString()
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proyecto)
        });
        alert('☁️ ¡Código respaldado en la nube!');
    } catch (e) {
        alert('❌ Error al conectar con la API');
    }
}

// Función para DESCARGAR el código de la nube
async function cloudLoad() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.html || data.css || data.js) {
            editors.html.value = data.html || '';
            editors.css.value = data.css || '';
            editors.js.value = data.js || '';
            alert('☁️ Código recuperado de la nube');
        }
    } catch (e) {
        alert('❌ No se pudo recuperar el código');
    }
      }
