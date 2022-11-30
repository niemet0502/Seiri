import Joi from 'joi';

export const UserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.any().valid(Joi.ref('password')).required(),
}).options({
  abortEarly: false,
});
