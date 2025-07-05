import sql from 'msnodesqlv8';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const connStr = process.env.DB_CONNECTION;

sql.query(connStr, "SELECT 1 AS test", (err, result) => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("Connection successful. Result:", result);
  }
});
