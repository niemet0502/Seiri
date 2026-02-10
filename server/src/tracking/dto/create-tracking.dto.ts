import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackingDto {
  @ApiProperty({
    example: 'Save for vacation',
    description: "The tracking's title",
  })
  public title: string;

  @ApiProperty({
    example: 'Saving money for summer vacation',
    description: "The tracking's description",
    required: false,
  })
  public description?: string;

  @ApiProperty({
    example: '2026-12-31',
    description: "The tracking's due date",
    required: false,
  })
  public dueDate?: Date;

  @ApiProperty({
    example: 5000,
    description: 'The target amount to reach',
  })
  public target: number;

  @ApiProperty({
    example: 1000,
    description: 'The current balance',
    required: false,
    default: 0,
  })
  public balance?: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the project this tracking belongs to',
  })
  public projectId: number;
}
