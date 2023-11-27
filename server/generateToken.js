const jwt = require("jsonwebtoken");

function generateToken(user) {
  const jwtSecret = process.env.JWT_SECRET;

  return jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });
}

module.exports = { generateToken };
