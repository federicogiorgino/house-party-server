const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
  validationSignup
} = require("../helpers/middlewares");

// GET '/auth/me'
router.get("/me", isLoggedIn, (req, res, next) => {
  const currentUserSessionData = req.session.currentUser;
  //checks ifLoggedIn
  currentUserSessionData.password = "*";
  // if loggedIn sends back a json with the current user data
  res.status(200).json(currentUserSessionData);
});

// POST '/auth/signup'
router.post("/signup", isNotLoggedIn, validationSignup, async (req, res, next) => {
  // destructures the req.body and gets the username, password properties from it
  const { firstName, lastName, username, password, email, bio, image, phone } = req.body;

  try {
    // projection
    const usernameExists = await User.findOne({ username }, "username");

    //checks if username exists and return an error 400 if it does
    if (usernameExists) return next(createError(400));
    // if (usernameExists) res.status(400).json({ msg: "Username already in use" });
    else {
      //if not , proceedes with password creation
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = await User.create({
        firstName,
        lastName,
        username,
        password: hashPass,
        email,
        bio,
        image,
        phone
      });
      //hides the password
      newUser.password = "*";
      req.session.currentUser = newUser;
      res
        .status(200) //Created
        .json(newUser); //Sends a JSON file with all the current user data
    }
  } catch (error) {
    next(createError(error));
  }
});

// POST '/auth/login'
router.post("/login", isNotLoggedIn, validationLogin, async (req, res, next) => {
  // destructures the req.body and gets the username, password properties from it
  const { username, password } = req.body;
  try {
    // await and looks for a User with 'username'
    const user = await User.findOne({ username });
    // if no user with that username exist throw an error
    if (!user) {
      next(createError(404));
    }
    // if not compare the input password to the password in the database
    else if (bcrypt.compareSync(password, user.password)) {
      // hides the password
      user.password = "*";
      req.session.currentUser = user;
      res.status(200).json(user);
    } else {
      next(createError(401)); // Not authorized
    }
  } catch (error) {
    next(createError(error));
  }
});

// POST '/auth/logout'
router.post("/logout", isLoggedIn, (req, res, next) => {
  //after checking is isLoggedIn
  //destroys the current session
  req.session.destroy();
  res
    .status(204) //  No Content
    .send();
});

module.exports = router;
