import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { login, register, updateUser, getProfile, logout, guestLogin } from './controllers/authController.js';

import { saveCheckup, getCheckupHistory, getCheckup, deleteCheckup } from './controllers/checkupController.js';

dotenv.config();

const app = express();
const PORT = 5600;
const CONNECTION_STRING = "server=DESKTOP-JCBD651\\SQLEXPRESS;Database=HeartAnalyzer;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};"

/*app.use(cors({
  origin: '*', // Adjust this to your frontend URL
  // origin: 'http://localhost:5173',
  // credentials: true
}));*/

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// Enable pre-flight requests for all routes

// app.options('*', cors());
// Middleware to parse JSON and URL-encoded data
// Increase the limit to handle larger payloads


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

/* -------------------- 🔐 Routes -------------------- */
app.post('/api/login', login);
app.post('/api/register', register);
app.get('/api/profile/:id', getProfile);
app.put('/api/edit-profile/:id', updateUser);
app.post('/api/logout', logout);
app.post('/api/guest-login', guestLogin);
app.post('/api/predict/:id', saveCheckup);
app.get('/api/history/:id', getCheckupHistory);
app.get('/api/checkup/:id', getCheckup); // Assuming this is to get
app.delete('/api/checkup/:id', deleteCheckup); // Ensure user is authenticated before

/* -------------------- 🚀 Server Start -------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});



// import express from 'express';
// import cors from 'cors';  
// import sql from 'msnodesqlv8';

// const connectionString = "server=DESKTOP-JCBD651\\SQLEXPRESS;Database=HeartAnalyzer;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};"
// const query = "SELECT * FROM users";

// sql.query(connectionString, query, (err, results) => {
//   if (err) {
//     console.error('SQL query error:', err);
//     return;
//   }
//   console.log('Query results:', results);
// });
