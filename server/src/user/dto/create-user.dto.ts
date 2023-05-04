import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Chadwick', description: "The user's firstname" })
  public firstname?: string;

  @ApiProperty({ example: 'Boseman', description: "The user's first lastname" })
  public lastname?: string;
  @ApiProperty({
    example: 'chadwickboseman@gmail.com',
    description: "The user's email",
  })
  public email?: string;
  @ApiProperty({ description: "The user's password" })
  public password?: string;
  @ApiProperty({ description: "The user's confirm_password" })
  public confirm_password?: string;

  @ApiProperty({ description: "The user's avatar" })
  public avatar?: string;
}
