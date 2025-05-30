from flask import Flask, jsonify

app = Flask(__name__)

archivos = ['archivo1.txt', 'archivo2.txt', 'archivo3.txt']

@app.route('/archivos')
def obtener_archivos():
    return jsonify(archivos)

if __name__ == '__main__':
    app.run(port=5003)
