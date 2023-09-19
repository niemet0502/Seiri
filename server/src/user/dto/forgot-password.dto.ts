import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'chadwickboseman@email.com',
    description: "user's email",
  })
  public email: string;
}
