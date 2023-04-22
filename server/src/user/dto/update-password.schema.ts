import Joi from 'joi';

export const UpdatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required(),
}).options({
  abortEarly: false,
});
