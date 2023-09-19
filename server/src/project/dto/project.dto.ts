import Joi from 'joi';

export const ProjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  handledObject: Joi.number().required(),
}).options({
  abortEarly: false,
});
