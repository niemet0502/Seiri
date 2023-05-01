import Joi from 'joi';

export const ResetPasswordSchema = Joi.object({
  resetToken: Joi.string().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
});
