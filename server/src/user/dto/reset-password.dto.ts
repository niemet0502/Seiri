import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'jsodjoaisjdhadpjasdjasdh',
    description: 'reset token',
  })
  public resetToken: string;
  @ApiProperty({ description: "The user's password" })
  public password?: string;
}
