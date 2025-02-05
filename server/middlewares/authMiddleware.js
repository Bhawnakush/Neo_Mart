import {signupSchema, loginSchema } from "../models/authModel.js";

// Middleware to check if a user is logged in
export const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401); // Respond with 401 Unauthorized if not logged in
};

// Middleware for signup validation
export const signupValidation = (req, res, next) => {
  try {
    signupSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors[0] });
  }
};

// Middleware for login validation
export const loginValidation = (req, res, next) => {
  try {
    loginSchema.parse(req.body); 
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors[0] });
  }
};

// Exporting the modules
export default { isLoggedIn, signupValidation, loginValidation };
