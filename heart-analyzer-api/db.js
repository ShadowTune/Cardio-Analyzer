import sql from 'mssql';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const dbConfig = {
  server: process.env.DB_SERVER, // DESKTOP-JCBD651\SQLEXPRESS
  database: process.env.DB_NAME, // HeartAnalyzer
  options: {
    trustedConnection: true, // Use Windows Authentication
    encrypt: false, // Set to true if using Azure or SSL
    trustServerCertificate: true, // For local development
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err.stack);
    throw err;
  });