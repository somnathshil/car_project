const express = require("express");
const router = express.Router();
const passport = require("passport");

const userControllers = require("../controllers/user.js");

router.get("/signup", userControllers.signUpRoute);
  
  router.post("/signup", userControllers.signUpPostRoute);
  
  router.get("/login", userControllers.logInRoute);
  
  router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login', // Redirect to login page on failure
    failureFlash: true         // Enable flash messages for errors
  }), userControllers.logInPostRoute);
  
  router.get("/logout", userControllers.logOutRoute);
  

  module.exports = router;
