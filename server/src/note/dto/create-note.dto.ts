import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    example: '2022 year in review',
    description: "The note's title",
  })
  public title: string;
  @ApiProperty({ example: 'lorem ipsum', description: "The note's  content" })
  public content: string;
  @ApiProperty({ example: '1', description: "The note's  projectId" })
  public projectId: number;
}
