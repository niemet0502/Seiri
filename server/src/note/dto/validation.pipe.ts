import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CreateNoteDto } from './create-note.dto';
import { NoteSchema } from './note.dto';

export class CreateNoteValidatorPipe implements PipeTransform<CreateNoteDto> {
  public transform(value: CreateNoteDto): CreateNoteDto {
    const result = NoteSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
