import express from 'express';
import { Login } from '../modal/login.model.js';
import { Signup } from '../modal/signup.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await Signup.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user._id);
      return res.json({
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// map to root so mounted app.use('/api/login', ...) -> POST /api/login
router.post('/', loginUser);
export default router;