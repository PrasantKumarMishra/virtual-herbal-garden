const express = require("express");
const Plant = require("../models/Plant");

const router = express.Router();

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};

// Herbal Garden Page
router.get("/garden", requireAuth, async (req, res) => {
  const plants = await Plant.find();
  res.render("garden", { user: req.session.user, plants });
});

module.exports = router;
