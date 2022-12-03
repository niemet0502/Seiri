import Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
});
