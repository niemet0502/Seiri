import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'chadwickboseman@gmail.com',
    description: "The user's email",
  })
  public email: string;
  @ApiProperty({ description: "The user's first password" })
  public password: string;
}
