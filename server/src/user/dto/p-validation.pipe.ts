import { BadRequestException, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';

export class ValidatorPipe<T> implements PipeTransform<T> {
  constructor(private readonly schema: Joi.Schema) {}

  public transform(value: T): T {
    const { error } = this.schema.validate(value);
    if (error) {
      const errorMessages = error.details.reduce((obj, err) => {
        const key = err.path[0];
        const value = err.message;
        return { ...obj, [key]: value };
      }, {});
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
