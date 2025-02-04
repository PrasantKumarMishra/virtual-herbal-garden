const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Render Signup Page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error signing up");
  }
});

// Render Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    req.session.user = user;
    res.redirect("/garden");
  } else {
    res.send("Invalid credentials");
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

module.exports = router;
