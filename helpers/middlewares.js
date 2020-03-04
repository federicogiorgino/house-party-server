const createError = require("http-errors");

exports.isLoggedIn = (req, res, next) => {
  //checks if the currentUser coming from express-session object exists
  if (req.session.currentUser) next();
  //if it exists next()
  else next(createError(401)); //otherwise throw an error401
};

exports.isNotLoggedIn = (req, res, next) => {
  //checks if the currentUser coming from express-session object does not exists
  if (!req.session.currentUser) next();
  // if it doest not exists next()
  else next(createError(403)); // otherwise throw an error403
};

exports.validationSignup = (req, res, next) => {
  const { firstName, lastName, username, password, email, bio } = req.body;

  if (!firstName || !lastName || !username || !email || !password || !bio) next(createError(400));
  else next();
};

exports.validationLogin = (req, res, next) => {
  const { username, password } = req.body; // destructures the req.body and gets the username, password properties from it
  if (!username || !password) next(createError(400));
  // if either the username or the pw/ or both do no match/exists throw an error400
  else next(); //otherwise next()
};
