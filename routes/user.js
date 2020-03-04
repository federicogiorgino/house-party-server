const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const moongoose = require("mongoose");

const User = require(".././models/User");
const Party = require(".././models/Party");

//GET /user => Show all users
router.get("/", async (req, res, next) => {
  try {
    //search for user in db
    const users = await User.find();
    //if no user exists sends back an error404
    if (!users) {
      next(createError(404));
    } else {
      //positive status and sends back json file of all users
      res.status(200).json(users);
      //maps through all the users
      users.map(user => res.json(user));
    }
  } catch (error) {
    next(error);
  }
});

//GET /user/:id => Shows specific user
router.get("/:id", async (req, res, next) => {
  try {
    // deconstruct req.params and get id
    const { id } = req.params;
    // check if the id is valid
    if (!moongoose.Types.ObjectId.isValid(id)) {
      //if not sends back an error
      res.status(400).json({ message: "ID not valid" });
      return;
    }
    //search the user by 'id' and populates it with attending and organizing (parties he attends and organized)
    const user = await User.findById(id).populate("attending organizing");
    //sends back a success status and creates a JSON with user.data
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//PUT /user/:id
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username, password, email, profilePicture, bio } = req.body;
    //check if the id of the user being modified is equal to the loggedIn user ID
    if (id !== req.session.currentUser._id) {
      res.status(401).json({ message: "Non authorizhed ID " });
      return;
    }
    // Check that all required fields are completed
    if (!firstName || !lastName) {
      next(createError(400));
    } else {
      await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          username,
          password,
          email,
          profilePicture,
          bio
        },
        { new: true }
      );
      const editedUser = await User.findById(id);
      //sets the current session User to edited User
      req.session.currentUser = editedUser;
      res.status(200).json(editedUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
