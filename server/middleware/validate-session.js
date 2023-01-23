const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT);
    const admin = await Admin.findById(decodedToken.id);
    if (!admin) {
      throw Error("Admin Not Found");
    }
    req.admin = admin;
    return next();
  } catch (error) {
    res.json({ message: error.message });

  }
};

module.exports = validateSession;