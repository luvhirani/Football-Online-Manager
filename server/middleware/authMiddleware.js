const jwt = require("jsonwebtoken");
const JWT_SECRET = "X9u5&d7C!pL2ePzF#1kQr8@wTxBmYjAoNvK%3*Gh";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Invalid or missing token", code: "INVALID_TOKEN" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Invalid or missing token", code: "INVALID_TOKEN" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or missing token", code: "INVALID_TOKEN" });
  }
};
