from archivos import app


def main():
    client = app.test_client()
    results = {}

    def check(method, path, **kwargs):
        http = getattr(client, method)
        resp = http(path, **kwargs)
        try:
            data = resp.get_json()
        except Exception:
            data = None
        return {
            'status': resp.status_code,
            'is_json': data is not None,
            'json': data if data is not None else None,
            'content_type': resp.headers.get('Content-Type'),
        }

    results['GET /'] = check('get', '/')
    results['GET /index2'] = check('get', '/index2')
    results['GET /formulario'] = check('get', '/formulario')
    results['GET /fomulario'] = check('get', '/fomulario')
    results['GET /editor'] = check('get', '/editor')
    results['GET /usuarios'] = check('get', '/usuarios')
    results['GET /mi-perfil'] = check('get', '/mi-perfil')

    results['GET /archivos'] = check('get', '/archivos')
    results['POST /enviar'] = check('post', '/enviar', json={'nombre': 'Ana', 'email': 'ana@example.com'})
    results['POST /registro'] = check('post', '/registro', data={'nombre': 'Ana', 'email': 'ana@example.com', 'password': '123'})
    results['POST /perfil'] = check('post', '/perfil', data={'nombre': 'Ana', 'email': 'ana@example.com', 'bio': 'Hola'})

    for key, value in results.items():
        print(f"{key}: {value}")


if __name__ == '__main__':
    main()
