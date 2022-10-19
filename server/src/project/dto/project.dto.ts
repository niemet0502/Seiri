import Joi from 'joi';

export const ProjectSchema = Joi.object({
  name: Joi.string().required(),
  userId: Joi.number().required(),
  description: Joi.string(),
}).options({
  abortEarly: false,
});
