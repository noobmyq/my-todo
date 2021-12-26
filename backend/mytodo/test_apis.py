from fastapi.testclient import TestClient

from todo.app import app

client = TestClient(app)

# TODO: write the test for the api endpoint here


def test_read_main():
    url = app.url_path_for("example_api_endpoint")
    response = client.get(url)
    assert response.status_code == 200
    assert response.json() == {"data": "example api endpoint"}
