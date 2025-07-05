import { PhoneDTO } from './phone.dto';

export class ContactDTO {
  id: string;
  name: string;
  email: string;
  phone?: PhoneDTO[];
}

export class CreateContactDTO {
  name: string;
  email: string;
}

export class UpdateContactDTO {
  name?: string;
  email?: string;
}
