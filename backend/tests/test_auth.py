"""Smoke tests for the auth flow. Run with a test database configured via DATABASE_URL."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_register_and_login():
    register_payload = {"username": "testuser1", "email": "testuser1@example.com", "password": "supersecret123"}
    register_response = client.post("/register", json=register_payload)
    assert register_response.status_code == 201
    assert register_response.json()["email"] == register_payload["email"]

    login_response = client.post("/login", json={"email": register_payload["email"], "password": register_payload["password"]})
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()


def test_login_wrong_password_rejected():
    response = client.post("/login", json={"email": "nobody@example.com", "password": "wrong"})
    assert response.status_code == 401
