import { PartialType } from '@nestjs/swagger';
import { CreateTrackingDto } from './create-tracking.dto';

export class UpdateTrackingDto extends PartialType(CreateTrackingDto) {}
