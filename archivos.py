from flask import Flask, jsonify, request, send_from_directory
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

archivos = ['archivo1.txt', 'archivo2.txt', 'archivo3.txt']

@app.route('/')
def home():
    return send_from_directory(BASE_DIR, 'index.htm')

@app.route('/index2')
def index2():
    return send_from_directory(BASE_DIR, 'index2.html')

@app.route('/formulario')
def formulario_page():
    return send_from_directory(BASE_DIR, 'formulario.html')

@app.route('/fomulario')
def fomulario_page():
    return send_from_directory(BASE_DIR, 'fomulario.html')

@app.route('/registro', methods=['GET'])
def registro_page():
    return send_from_directory(BASE_DIR, 'registro.html')

@app.route('/mi-perfil')
def mi_perfil_page():
    return send_from_directory(BASE_DIR, 'mi-perfil.html')

@app.route('/usuarios')
def usuarios_page():
    return send_from_directory(BASE_DIR, 'usuarios.html')

@app.route('/editor')
def editor_page():
    return send_from_directory(BASE_DIR, 'editor.html')

@app.route('/archivos', methods=['GET'])
def obtener_archivos():
    return jsonify(archivos)

@app.route('/enviar', methods=['POST'])
def enviar():
    data = request.get_json(silent=True) or {}
    nombre = data.get('nombre')
    email = data.get('email')
    if not nombre or not email:
        return jsonify(ok=False, mensaje='Faltan campos requeridos'), 400
    return jsonify(ok=True, mensaje=f'Recibido: {nombre} <{email}>')

@app.route('/registro', methods=['POST'])
def registrar():
    nombre = request.form.get('nombre', '')
    email = request.form.get('email', '')
    password = request.form.get('password', '')
    if not nombre or not email or not password:
        return jsonify(ok=False, mensaje='Faltan campos requeridos'), 400
    return jsonify(ok=True, mensaje=f'Usuario {nombre} registrado')

@app.route('/perfil', methods=['POST'])
def actualizar_perfil():
    nombre = request.form.get('nombre', '')
    email = request.form.get('email', '')
    bio = request.form.get('bio', '')
    return jsonify(ok=True, mensaje='Perfil actualizado', nombre=nombre, email=email, bio=bio)

if __name__ == '__main__':
    app.run(port=5003, debug=True)
