import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateProjectDto } from './create-project.dto';
import { ProjectSchema } from './project.dto';

export class CreateProjectValidatorPipe
  implements PipeTransform<CreateProjectDto>
{
  public transform(value: CreateProjectDto): CreateProjectDto {
    const result = ProjectSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
