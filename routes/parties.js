const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const mongoose = require("mongoose");

const Party = require("../models/Party");
const User = require("../models/User");
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
  validationSignup
} = require("../helpers/middlewares");

//GET /parties/:id => shows specific party
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    // deconstruct req.params and get id
    // check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      //if not sends back an error
      res.status(400).json({ message: "ID not valid" });
      return;
    }
    //if the id is valid . looks for the specif party with the ID specified and populates it with autor and guests
    const party = await Party.findById(id).populate("author");
    res.status(200).json(party);
  } catch (error) {
    next(error);
  }
});

// DELETE	/parties/delete/:id	===> delete specific party
router.delete("/:id", isLoggedIn, async (req, res, next) => {
  // gets the party id from the params
  const partyId = req.params.id;

  try {
    //search for the party with the id and removes it
    await Party.findByIdAndRemove(partyId);
    // updated the user and removes the party from the attending/organizing
    await User.updateMany(
      {},
      {
        $pull: { organizing: partyId, attending: partyId }
      },
      { new: true }
    );

    res.status(200).json({ message: "Party removed" });
  } catch (error) {
    next(error);
  }
});

//POST /parties/create => create a party
router.post("/", isLoggedIn, (req, res, next) => {
  console.log("hello");

  const { title, description, guestLimit, city, address, date } = req.body;
  //check if the required field exists
  if (!title || !description || !guestLimit || !city || !address || !date) {
    return next(createError(404)); //sends error if they don't exists
  } else {
    //otherwise proceeds with creating a party
    Party.create({
      host: req.session.currentUser._id,
      title,
      description,
      guestLimit,
      city,
      address,
      date
    })
      .then(newParty => {
        const partyId = newParty._id;
        const userId = req.session.currentUser._id;
        //find the user with current session id and adds to the array 'organizing' the party id
        User.findByIdAndUpdate(userId, { $push: { organizing: partyId } }, { new: true }).then(
          updatedUser => {
            // sends back positive response and json the updatedUser data
            // res.status(200).json(updatedUser);
            res.status(200).json(newParty);
          }
        );
        // res.status(200).json(newParty);
      })
      .catch(error => {
        next(error);
      });
  }
});

//PUT /parties/:id
router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, guestLimit, city, address, date } = req.body;

    await Party.findByIdAndUpdate(
      id,
      { title, description, guestLimit, city, address, date },
      { new: true }
    );

    const updatedParty = await Party.findById(id);
    res.status(200).json(updatedParty);
  } catch (error) {
    next(error);
  }
});

//GET /parties => shows all parties
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    //gets all the parties
    const parties = await Party.find();
    if (!parties) {
      //if no parties exist
      // next(createError(404)); // create an error 404
      res.json({ message: "Error" });
    } else {
      //if parties exists send good status and json file with all the parties data
      res.status(200).json(parties);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
