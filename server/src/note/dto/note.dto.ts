import Joi from 'joi';

export const NoteSchema = Joi.object({
  title: Joi.string().required(),
  projectId: Joi.number().required(),
  content: Joi.string(),
}).options({
  abortEarly: false,
});
