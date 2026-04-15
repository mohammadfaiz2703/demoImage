const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    "ILOVEHER",
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;