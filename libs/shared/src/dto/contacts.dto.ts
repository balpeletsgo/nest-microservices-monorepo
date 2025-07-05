export class ContactDTO {
  id: string;
  name: string;
  email: string;
}

export class CreateContactDTO {
  name: string;
  email: string;
}

export class UpdateContactDTO {
  name?: string;
  email?: string;
}
