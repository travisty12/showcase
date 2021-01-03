import express from "express";
import Joi from 'joi';
import User from '../models/user';
import { signUp } from '../validations/user';

const userRoutes = express.Router();

userRoutes.post("", (req, res) => {
  try {
    const { username, email, password } = req.body;
    await Joi.validate({ username, email, password }, signUp);
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send({ userId: newUser.id, username });

  } catch (error) {
    res.status(400).send(err);
  }
});

export default userRoutes;