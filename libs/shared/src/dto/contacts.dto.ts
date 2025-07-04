import { PartialType } from '@nestjs/mapped-types';

export class ContactDto {
  id: string;
  name: string;
  number?: string[];
}

export class CreateContactDto {
  name: string;
  number?: string[];
}

export class UpdateContactDto extends PartialType(CreateContactDto) {}
