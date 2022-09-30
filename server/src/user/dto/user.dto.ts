import Joi from 'joi';

export const UserSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
}).options({
  abortEarly: false,
});
