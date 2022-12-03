import { BadRequestException, PipeTransform } from '@nestjs/common';
import { LoginSchema } from './login-schema';
import { LoginDto } from './login.dto';

export class LoginValidatorPipe implements PipeTransform<LoginDto> {
  public transform(value: LoginDto): LoginDto {
    const result = LoginSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
