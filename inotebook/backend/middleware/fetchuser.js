const jwt = require("jsonwebtoken");
const JWT_SECRET = "sohan";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    // @ts-ignore
    req.user = data.user;
  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
  next();
};
module.exports = fetchUser;
