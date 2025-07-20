import { PartialType } from '@nestjs/mapped-types';
import { SendEmailDto } from './create-email.dto';

export class UpdateEmailDto extends PartialType(SendEmailDto) {}
