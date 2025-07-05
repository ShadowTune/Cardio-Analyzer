import sql from 'msnodesqlv8';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

const CONNECTION_STRING = "server=DESKTOP-JCBD651\\SQLEXPRESS;Database=HeartAnalyzer;Trusted_Connection=yes;Driver={ODBC Driver 17 for SQL Server};"
const JWT_SECRET = process.env.JWT_SECRET;

/* 🔐 Login */
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  const query = `SELECT * FROM users WHERE email = ?`;
  sql.query(CONNECTION_STRING, query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    const user = results[0];
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user;
    res.json({ token, user: safeUser });
  });
};

/* 📝 Register */
export const register = async (req, res) => {
  const { name, email, password, photo, role_id } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email, and password are required." });

  const checkQuery = `SELECT * FROM users WHERE email = ?`;
  sql.query(CONNECTION_STRING, checkQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (results.length > 0) return res.status(409).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery = `
      INSERT INTO users (name, email, password, photo, role_id) 
      OUTPUT INSERTED.id 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [name, email, hashedPassword, photo || '', role_id || 1];

    sql.query(CONNECTION_STRING, insertQuery, values, (err2, result) => {
      if (err2) return res.status(500).json({ message: "Insert error", error: err2 });

      const insertedId = result[0].id;
      const safeUser = { id: insertedId, name, email, photo: photo || '', role_id: role_id || 1 };
      const token = jwt.sign({ id: insertedId, email }, JWT_SECRET, { expiresIn: '7d' });

      res.status(201).json({ user: safeUser, token });
    });
  });
};

/* 🔍 Get Profile (Protected) */
export const getProfile = (req, res) => {
  const { id } = req.params;
  // You should verify the token before this point in middleware

  const selectQuery = 'SELECT * FROM users WHERE id = ?';
  sql.query(CONNECTION_STRING, selectQuery, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error', error: err });
    if (!results.length) return res.status(404).json({ message: 'User not found' });

    const { password: _, ...safeUser } = results[0];
    res.json({ user: safeUser });
  });
};


/* ✏️ Update User */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, photo, password } = req.body;

  try {
    let updateQuery = `
      UPDATE users SET 
        name = ?, 
        email = ?, 
        photo = ?
    `;
    const params = [name, email, photo || ''];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery += `, password = ?`;
      params.push(hashedPassword);
    }

    updateQuery += ` WHERE id = ?`;
    params.push(id);

    sql.query(CONNECTION_STRING, updateQuery, params, (err) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      const selectQuery = `SELECT * FROM users WHERE id = ?`;
      sql.query(CONNECTION_STRING, selectQuery, [id], (err2, results) => {
        if (err2) return res.status(500).json({ message: 'Fetch failed', error: err2 });

        const user = results[0];
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { password: _, ...safeUser } = user;
        res.json({ user: safeUser });
      });
    });
  } catch (err) {
    console.error("Unexpected error during update:", err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

/* 🚪 Logout (frontend only) */
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

export const guestLogin = (req, res) => {
  const guestUser = {
    id: 'guest',
    name: 'Guest User',
    email: '',
    role_id: 0
  };

  const token = jwt.sign(guestUser, JWT_SECRET, { expiresIn: '1h' });

  res.json({ user: guestUser, token });
};
