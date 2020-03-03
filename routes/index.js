const express = require("express");
const router = express.Router();

//ROUTERS
const authRouter = require("./auth");
const userRouter = require("./user");
const partiesRouter = require("./parties");
const cloudinaryRouter = require("./cloudinary");

// PREROUTE MIDDLEWARE - needed to check if user has a cookie
router.use((req, res, next) => {
  if (req.session.currentUser) {
    // if there's user in the session (user is logged in)
    next(); // go to the next route
  } else {
    res.redirect("/login");
  }
});

// * /auth
router.use("/auth", authRouter);
// * /user
router.use("/user", userRouter);
// * /parties
router.use("/parties", partiesRouter);
// * /cloudinary
router.use("/cloudinary", cloudinaryRouter);

module.exports = router;
