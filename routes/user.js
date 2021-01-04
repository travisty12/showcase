import express from "express";
// import Joi from 'joi';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from '../util/helpers';

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await signUp.validate({ username, email, password });
    const newUser = new User({ username, email, password });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;
    res.send(sessionUser);

  } catch (error) {
    res.status(400).send(parseError(error));
  }
});

export default userRoutes;