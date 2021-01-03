import express from "express";
import Joi from "joi";
import User from '../models/user';
import { signIn } from '../validations/user';
import { parseError, sessionizeUser } from '../util/helpers';
import { SESS_NAME } from '../config';

const sessionRouter = express.Router();

sessionRouter.post("", async (req, res) => {
  try {
    const {email, password} = req.body;
    await Joi.validate({ email, password }, signIn);

    const user = await User.findOne({ email });
    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user);

      req.session.user = sessionUser;
      res.send(sessionUser);
    } else {
      throw new Error('Invalid login credentials');
    }
  } catch (err) {
    res.status(401).send(parseError(err));
  }
});

export default sessionRouter;