import { UserRequest } from '@app/common/interface';
import { CreateContactDTO, UpdateContactDTO } from '@app/shared/dto';
import { CONTACTS_PATTERNS } from '@app/shared/patterns';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactsService } from './contacts.service';

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @MessagePattern(CONTACTS_PATTERNS.CREATE)
  create(@Payload() req: UserRequest, @Payload('body') body: CreateContactDTO) {
    return this.contactsService.create(req.user, body);
  }

  @MessagePattern(CONTACTS_PATTERNS.FIND_ALL)
  findAll(@Payload() req: UserRequest) {
    return this.contactsService.findAll(req.user);
  }

  @MessagePattern(CONTACTS_PATTERNS.FIND_ONE)
  findOne(@Payload() req: UserRequest, @Payload('id') id: string) {
    return this.contactsService.findOne(req.user, id);
  }

  @MessagePattern(CONTACTS_PATTERNS.UPDATE)
  update(
    @Payload() req: UserRequest,
    @Payload('id') id: string,
    @Payload('body') body: UpdateContactDTO,
  ) {
    return this.contactsService.update(req.user, id, body);
  }

  @MessagePattern(CONTACTS_PATTERNS.REMOVE)
  delete(@Payload() req: UserRequest, @Payload('id') id: string) {
    return this.contactsService.delete(req.user, id);
  }
}
