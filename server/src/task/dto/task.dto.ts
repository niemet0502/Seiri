import Joi from 'joi';

export const TaskSchema = Joi.object({
  title: Joi.string().required(),
  projectId: Joi.number().required(),
  description: Joi.string(),
  parentId: Joi.number(),
}).options({
  abortEarly: false,
});
