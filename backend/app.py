from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pickle
import pandas as pd
import numpy as np
import os
import requests

app = Flask(__name__)

# Enable CORS for frontend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# === Load model, scaler, expected columns ===
MODEL_PATH = os.path.abspath("D:/heart-analyzer/backend/heartdiseaseprediction.model")
SCALER_PATH = os.path.abspath("D:/heart-analyzer/backend/scaler.model")
COLUMNS_PATH = os.path.abspath("D:/heart-analyzer/backend/expected_columns.pkl")

try:
    model = joblib.load(MODEL_PATH)
    with open(SCALER_PATH, "rb") as f:
        scaler = pickle.load(f)
    with open(COLUMNS_PATH, "rb") as f:
        expected_columns = pickle.load(f)

    print("✅ Model, scaler, and feature columns loaded successfully.")
except Exception as e:
    print("❌ Failed to load model assets:", str(e))
    raise

# === Predict Endpoint ===
@app.route("/api/predict/<user_id>", methods=["POST"])
def predict(user_id):
    try:
        data = request.get_json()
        
        # Required features for model
        required_fields = [
            'age', 'sex', 'cp', 'trestbps', 'chol',
            'fbs', 'restecg', 'thalach', 'exang',
            'oldpeak', 'slope', 'ca', 'thal'
        ]

        # Validate input
        missing = [f for f in required_fields if f not in data]
        if missing:
            return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

        # Prepare input
        df = pd.DataFrame([data])
        df_encoded = pd.get_dummies(df)
        df_aligned = df_encoded.reindex(columns=expected_columns, fill_value=0)
        input_scaled = scaler.transform(df_aligned)

        # Predict
        prediction = model.predict(input_scaled)[0]
        probs = model.predict_proba(input_scaled)[0]

        result_label = 'Presence' if prediction == 1 else 'Absence'
        
        confidence = max(probs)
        risk_percent = probs[1]  # Probability of heart disease

        # === Define risk level ===
        if risk_percent < 0.25:
            risk_level = 'Normal'
        elif risk_percent < 0.50:
            risk_level = 'Mild'
        elif risk_percent < 0.75:
            risk_level = 'Moderate'
        else:
            risk_level = 'Critical'

        # === Save checkup to backend ===
        checkup_data = {
            "user_id": user_id,
            "age": data["age"], "sex": data["sex"], "cp": data["cp"],
            "trestbps": data["trestbps"], "chol": data["chol"],
            "fbs": data["fbs"], "restecg": data["restecg"],
            "thalach": data["thalach"], "exang": data["exang"],
            "oldpeak": data["oldpeak"], "slope": data["slope"],
            "ca": data["ca"], "thal": data["thal"],
            "result": risk_level
        }

        print("🛬 checkup_data to save:", checkup_data)
        
        try:
            save_response = requests.post(
                f"http://localhost:5600/api/predict/{user_id}",
                json=checkup_data
            )
            if save_response.status_code != 201:
                print("⚠️ Failed to save checkup:", save_response.text)
        except Exception as e:
            print("⚠️ Error connecting to backend:", str(e))

        # === Send response to frontend ===
        return jsonify({
            "user_id": user_id,
            "confidence": f"{confidence:.2%}",  # e.g. "95.00%"
            "probability_presence": f"{risk_percent:.2%}",  # e.g. "65.00%"
            "risk_level": risk_level
        })


    except Exception as e:
        print("❌ Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)