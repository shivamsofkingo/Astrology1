const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'supersecretkey_astrology_123';

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'Softkingo@gmail.com' && password === 'Softkingo@123') {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token, user: { email, role: 'admin' } });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post('/api/logout', (req, res) => {
  // Since JWT is stateless, logout is typically handled client-side by deleting the token.
  // We provide this endpoint to fulfill the request, it can be used to clear server-side sessions if added later.
  res.json({ success: true, message: 'Logged out successfully' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
