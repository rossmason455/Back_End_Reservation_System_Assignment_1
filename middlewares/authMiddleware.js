const jwt = require("jsonwebtoken"); 
const { Token } = require("../models");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

 try {
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
  next();
} catch (err) {
  console.error('JWT verify error:', err.name, err.message);
  return res.status(401).json({ message: 'Invalid token', error: err.message });
}
};

module.exports = authMiddleware;
