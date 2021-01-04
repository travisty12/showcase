import Joi from 'joi';

const email = Joi.string().email().required();
const username = Joi.string().alphanum().min(3).max(30).required();

const message = 'must be between 8 and 20 characters, ' + 
  'have one capital letter, ' +
  'one lowercase letter, ' +
  'one number, ' +
  'and one special character';

const password = Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/).required().messages({ 
  'string.pattern.base': message
});

export const signUp = Joi.object().keys({
  email,
  username,
  password
});

export const signIn = Joi.object().keys({
  email,
  password
});