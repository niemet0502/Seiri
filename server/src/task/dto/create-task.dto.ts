import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'build a portfolio',
    description: "The task's title",
  })
  public title: string;
  @ApiProperty({
    example: 'create a new website ',
    description: "The task's  description",
  })
  public description: string;
  @ApiProperty({ example: '1', description: "The task's  projectId" })
  public projectId: number;
}
