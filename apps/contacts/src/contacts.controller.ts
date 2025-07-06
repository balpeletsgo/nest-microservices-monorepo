import { UserRequest } from '@app/common/interface';
import {
  CreateContactDTO,
  CreatePhoneDTO,
  UpdateContactDTO,
  UpdatePhoneDTO,
} from '@app/shared/dto';
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

  @MessagePattern(CONTACTS_PATTERNS.CREATE_PHONE)
  createPhone(
    @Payload('contactId') contactId: string,
    @Payload('body') body: CreatePhoneDTO,
  ) {
    return this.contactsService.createPhone(contactId, body);
  }

  @MessagePattern(CONTACTS_PATTERNS.FIND_ONE_PHONE)
  findOnePhone(
    @Payload('contactId') contactId: string,
    @Payload('phoneId') phoneId: string,
  ) {
    return this.contactsService.findOnePhone(contactId, phoneId);
  }

  @MessagePattern(CONTACTS_PATTERNS.UPDATE_PHONE)
  updatePhone(
    @Payload('contactId') contactId: string,
    @Payload('phoneId') phoneId: string,
    @Payload('body') body: UpdatePhoneDTO,
  ) {
    return this.contactsService.updatePhone(contactId, phoneId, body);
  }

  @MessagePattern(CONTACTS_PATTERNS.REMOVE_PHONE)
  deletePhone(
    @Payload('contactId') contactId: string,
    @Payload('phoneId') phoneId: string,
  ) {
    return this.contactsService.deletePhone(contactId, phoneId);
  }
}
