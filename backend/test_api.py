import requests
import json
import random

# A mock script to test the /predict endpoint of the ThermaSense API

# Assuming N features (let's say 5 for this mock)
N_FEATURES = 5
mock_data = {
    "data": [
        [random.uniform(20.0, 80.0) for _ in range(N_FEATURES)] 
        for _ in range(10)
    ]
}

url = "http://localhost:8000/predict"

print(f"Sending POST request to {url}")
print(f"Payload shape: 10 steps of {N_FEATURES} features.")

try:
    response = requests.post(url, json=mock_data)
    
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Success! Inference Result:")
        print(json.dumps(response.json(), indent=2))
    else:
        print("Error response:")
        print(response.text)
except requests.exceptions.ConnectionError:
    print("Failed to connect. Make sure the FastAPI server is running (e.g., `uvicorn main:app --reload`).")
except Exception as e:
    print(f"An error occurred: {e}")
