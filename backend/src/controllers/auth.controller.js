const crypto = require("crypto");
const User = require("../models/user.model");

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "name, email, password, and role are required.",
      });
    }

    if (!["user", "driver"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "role must be either user or driver.",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with that email already exists.",
      });
    }

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashPassword(password),
      role,
    });

    return res.status(201).json({
      success: true,
      data: sanitizeUser(user),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A user with that email already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to sign up user.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "email, password, and role are required.",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail, role });

    if (!user || user.password !== hashPassword(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email, password, or role.",
      });
    }

    return res.status(200).json({
      success: true,
      data: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to log in user.",
    });
  }
};

module.exports = {
  signup,
  login,
};
