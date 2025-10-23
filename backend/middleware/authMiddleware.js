import jwt from "jsonwebtoken";
import { Signup } from "../modal/signup.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("auth header:", authHeader);

    if (authHeader && typeof authHeader === "string") {
      token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    }

    // cookie / query fallback (optional)
    if (!token && req.cookies) token = req.cookies.token || req.cookies.authorization;
    if (!token && req.query && req.query.token) token = req.query.token;

    console.log("extracted token:", token ? `${token.slice(0,10)}...` : "NONE");

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not set");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("jwt.verify error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }

    const user = await Signup.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Not authorized, user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("auth error:", error.stack || error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
