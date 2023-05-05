import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ example: '*****', description: "users old password" })
  public oldPassword?: string;

  @ApiProperty({
    example: '*****',
    description: "user's new password ",
  })
  public newPassword?: string;

  @ApiProperty({
    example: '*****',
    description: "user's new password ",
  })
  public confirmPassword?: string;
}
