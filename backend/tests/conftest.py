"""
conftest.py — configuração compartilhada dos testes backend
============================================================
Faz bootstrap do app Flask em modo de teste usando o banco real (Docker).
"""
import sys
import os

# garante que o módulo app/ esteja no path quando pytest roda de /app/tests/
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'app'))

import pytest
from main import app as flask_app


@pytest.fixture(scope='session')
def app():
    flask_app.config.update({
        'TESTING': True,
        'WTF_CSRF_ENABLED': False,
    })
    yield flask_app


@pytest.fixture(scope='session')
def client(app):
    return app.test_client()
