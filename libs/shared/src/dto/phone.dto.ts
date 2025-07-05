import { PartialType } from '@nestjs/mapped-types';
import { ContactDTO } from './contacts.dto';

export class PhoneDTO {
  id: string;
  phone: string;
  contact?: ContactDTO;
}

export class CreatePhoneDTO {
  phone: string;
}

export class UpdatePhoneDTO extends PartialType(CreatePhoneDTO) {}
