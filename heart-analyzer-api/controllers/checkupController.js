import sql from 'msnodesqlv8';
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_STRING = "server=DESKTOP-JCBD651\\SQLEXPRESS;Database=HeartAnalyzer;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};";

/* 🏥 Save Checkup */
export const saveCheckup = (req, res) => {
  const user_id = req.params.id;
  const {
    age, sex, cp, trestbps, chol, fbs, restecg,
    thalach, exang, oldpeak, slope, ca, thal
  } = req.body;

  let result = req.body.result || 'unknown'; // Default to 'unknown' if result is not provided

  const query = `
    INSERT INTO checkups (
      user_id, age, sex, cp, trestbps, chol, fbs, restecg,
      thalach, exang, oldpeak, slope, ca, thal, result
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    user_id, age, sex, cp, trestbps, chol, fbs, restecg,
    thalach, exang, oldpeak, slope, ca, thal, result
  ];

  sql.query(CONNECTION_STRING, query, values, (err) => {
    if (err) {
      console.error("Error saving checkup:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.status(201).json({ message: "Checkup saved successfully" });
  });
};

/* 📋 Get Checkup History by User ID */
export const getCheckupHistory = (req, res) => {
  const user_id = req.params.id;

  const query = `SELECT * FROM checkups WHERE user_id = ? ORDER BY id DESC`;

  sql.query(CONNECTION_STRING, query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching checkup history:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.json(results);
  });
};

/* 🔍 Get Single Checkup by Checkup ID */
export const getCheckup = (req, res) => {
  const checkup_id = req.params.id;

  const query = `SELECT * FROM checkups WHERE id = ?`;

  sql.query(CONNECTION_STRING, query, [checkup_id], (err, results) => {
    if (err) {
      console.error("Error fetching checkup:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Checkup not found" });
    }

    const checkup = results[0];

    // Optional: remove metadata if needed
    const { id, user_id, created_at, result, ...input_data } = checkup;

    res.json({ id, user_id, created_at, result, input_data });
  });
};


/* 🗑️ Delete Checkup by ID */
export const deleteCheckup = (req, res) => {
  const checkup_id = req.params.id;

  const query = `DELETE FROM checkups WHERE id = ?`;

  sql.query(CONNECTION_STRING, query, [checkup_id], (err) => {
    if (err) {
      console.error("Error deleting checkup:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    res.json({ message: "Checkup deleted successfully" });
  });
};
