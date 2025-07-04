import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactsService } from './contacts.service';
import { CONTACTS_PATTERNS } from '@app/shared/patterns';
import { CreateContactDto, UpdateContactDto } from '@app/shared/dto';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @MessagePattern(CONTACTS_PATTERNS.CREATE)
  create(@Payload() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @MessagePattern(CONTACTS_PATTERNS.FIND_ALL)
  findAll() {
    return this.contactsService.findAll();
  }

  @MessagePattern(CONTACTS_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.contactsService.findOne(id);
  }

  @MessagePattern(CONTACTS_PATTERNS.UPDATE)
  update(
    @Payload()
    {
      id,
      updateContactDto,
    }: {
      id: number;
      updateContactDto: UpdateContactDto;
    },
  ) {
    return this.contactsService.update(id, updateContactDto);
  }

  @MessagePattern(CONTACTS_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.contactsService.remove(id);
  }
}
