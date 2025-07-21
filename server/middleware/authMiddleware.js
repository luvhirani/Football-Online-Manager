const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    console.log("authMiddlewareeeee")
  const authHeader = req.headers.authorization;
  console.log("authHeaderrr:",authHeader)
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req.user:",req.user)
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or missing token", code: "INVALID_TOKEN" });
  }
};
