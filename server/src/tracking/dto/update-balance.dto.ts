import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDto {
  @ApiProperty({
    example: 500,
    description: 'The amount to add to the balance',
  })
  public amount: number;
}
