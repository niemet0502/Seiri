import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { TaskSchema } from './task.dto';

export class CreateTaskValidatorPipe implements PipeTransform<CreateTaskDto> {
  public transform(value: CreateTaskDto): CreateTaskDto {
    const result = TaskSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
