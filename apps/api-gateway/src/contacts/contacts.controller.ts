import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CONTACTS_PATTERNS } from '@app/shared/patterns';
import {
  CreateContactDto,
  UpdateContactDto,
} from '@app/shared/dto/contacts.dto';
import { CONTACTS_SERVICE } from './constant';

@Controller('contacts')
export class ContactsController {
  constructor(
    @Inject(CONTACTS_SERVICE as unknown as string)
    private contactsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsClient.send(CONTACTS_PATTERNS.CREATE, createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsClient.send(CONTACTS_PATTERNS.FIND_ALL, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsClient.send(CONTACTS_PATTERNS.FIND_ONE, { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsClient.send(CONTACTS_PATTERNS.UPDATE, {
      id,
      updateContactDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsClient.send(CONTACTS_PATTERNS.REMOVE, { id });
  }
}
