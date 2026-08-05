from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
import numpy as np
import pickle
import os

app = FastAPI(
    title="ThermaSense Inference API",
    description="API for proactively predicting data center cooling states.",
    version="1.0.0"
)

# Global variables for model and scaler
scaler = None
model = None

class PredictionRequest(BaseModel):
    data: List[List[float]] = Field(
        ..., 
        description="A list of 10 time steps, where each step is a list of N features."
    )

@app.on_event("startup")
async def load_models():
    global scaler, model
    
    # We will import tensorflow here to avoid crashing the whole app if TF isn't installed
    # useful if users want to just see the docs.
    try:
        import tensorflow as tf
        from tensorflow.keras.models import load_model
    except ImportError:
        print("Warning: tensorflow is not installed. Model predictions will fail.")
        tf = None

    base_dir = os.path.dirname(os.path.abspath(__file__))
    scaler_path = os.path.join(base_dir, "models", "thermal_scaler.pkl")
    model_path = os.path.join(base_dir, "models", "future_cooling_model.h5")
    
    try:
        with open(scaler_path, "rb") as f:
            scaler = pickle.load(f)
        print(f"Loaded scaler from {scaler_path}")
    except Exception as e:
        print(f"Warning: Could not load scaler from {scaler_path}. Error: {e}")
        
    if tf is not None:
        try:
            model = load_model(model_path)
            print(f"Loaded model from {model_path}")
        except Exception as e:
            print(f"Warning: Could not load model from {model_path}. Error: {e}")

@app.post("/predict")
async def predict(request: PredictionRequest):
    global scaler, model
    
    if scaler is None or model is None:
        raise HTTPException(
            status_code=500, 
            detail="Model or scaler not loaded properly on the server. Please check server logs."
        )
    
    input_data = request.data
    
    if len(input_data) != 10:
        raise HTTPException(
            status_code=400, 
            detail=f"Expected exactly 10 time steps, got {len(input_data)}"
        )
        
    try:
        arr = np.array(input_data, dtype=np.float32)
    except Exception as e:
        raise HTTPException(
            status_code=400, 
            detail="Could not convert data to numpy array. Ensure it is a valid 2D array of numbers."
        )
    
    if len(arr.shape) != 2:
        raise HTTPException(status_code=400, detail="Data must be a 2D array of shape (10, N)")
        
    n_features = arr.shape[1]
    
    try:
        scaled_data = scaler.transform(arr)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error scaling data: {e}")
        
    # Reshape for the model: (batch_size, time_steps, features) -> (1, 10, N)
    reshaped_data = scaled_data.reshape(1, 10, n_features)
    
    try:
        prediction_val = model.predict(reshaped_data)
        # Handle different potential output shapes like [[0.82]] or [0.82]
        if len(prediction_val.shape) > 1:
            score = float(prediction_val[0][0])
        else:
            score = float(prediction_val[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during model prediction: {e}")
        
    # Map score to status 
    # < 0.75 is NORMAL, 0.75-0.85 is WARNING, > 0.85 is CRITICAL.
    if score < 0.75:
        status = "NORMAL"
    elif score <= 0.85:
        status = "WARNING"
    else:
        status = "CRITICAL"
        
    return {
        "prediction": score,
        "status": status
    }
