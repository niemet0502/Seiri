import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'roadmap', description: "The project's  name" })
  public name: string;
  @ApiProperty({
    example: 'Chadwick',
    description: "The project's  description",
  })
  public description?: string;
  @ApiProperty({
    example: 1,
    description: 'The Object handled by the project ',
  })
  public handledObject: number;

  public isDefault?: boolean;
}
