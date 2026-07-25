"""Smoke tests for favorites and history endpoints. Requires a test DATABASE_URL."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _register_and_login(username: str) -> str:
    email = f"{username}@example.com"
    client.post("/register", json={"username": username, "email": email, "password": "supersecret123"})
    login = client.post("/login", json={"email": email, "password": "supersecret123"})
    return login.json()["access_token"]


def test_favorite_toggle_add_and_remove():
    token = _register_and_login("activityuser1")
    headers = {"Authorization": f"Bearer {token}"}

    add_response = client.post("/favorite", json={"algorithm_slug": "bubble-sort"}, headers=headers)
    assert add_response.status_code == 200
    assert add_response.json()["algorithm_slug"] == "bubble-sort"

    list_response = client.get("/favorites", headers=headers)
    assert list_response.status_code == 200
    assert len(list_response.json()) == 1

    remove_response = client.post("/favorite", json={"algorithm_slug": "bubble-sort"}, headers=headers)
    assert remove_response.status_code == 200
    assert remove_response.json() is None

    list_after_remove = client.get("/favorites", headers=headers)
    assert list_after_remove.json() == []


def test_history_records_and_lists_most_recent_first():
    token = _register_and_login("activityuser2")
    headers = {"Authorization": f"Bearer {token}"}

    client.post("/history", json={"algorithm_slug": "bubble-sort"}, headers=headers)
    client.post("/history", json={"algorithm_slug": "bst"}, headers=headers)

    response = client.get("/history", headers=headers)
    assert response.status_code == 200
    slugs = [entry["algorithm_slug"] for entry in response.json()]
    assert slugs[0] == "bst"
    assert "bubble-sort" in slugs


def test_activity_endpoints_require_auth():
    assert client.get("/favorites").status_code == 403
    assert client.post("/favorite", json={"algorithm_slug": "bst"}).status_code == 403
    assert client.get("/history").status_code == 403
