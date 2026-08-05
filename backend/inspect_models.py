import pickle
import tensorflow as tf

def inspect_models():
    scaler_path = 'models/thermal_scaler.pkl'
    model_path = 'models/future_cooling_model.h5'

    try:
        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)
        print("Scaler loaded successfully.")
        print(f"Scaler expected features IN: {scaler.n_features_in_}")
    except Exception as e:
        print(f"Error loading scaler: {e}")

    try:
        model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully.")
        print(f"Model input shape: {model.input_shape}")
        print(f"Model output shape: {model.output_shape}")
    except Exception as e:
        print(f"Error loading model: {e}")

if __name__ == '__main__':
    inspect_models()
