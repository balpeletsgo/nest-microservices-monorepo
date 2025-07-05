import { Controller } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PHONE_PATTERNS } from '@app/shared/patterns';
import { CreatePhoneDTO, UpdatePhoneDTO } from '@app/shared/dto';

@Controller()
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @MessagePattern(PHONE_PATTERNS.CREATE)
  create(
    @Payload('contactId') contactId: string,
    @Payload('body') body: CreatePhoneDTO,
  ) {
    return this.phoneService.create(contactId, body);
  }

  @MessagePattern(PHONE_PATTERNS.FIND_ONE)
  findOne(@Payload('contactId') contactId: string, @Payload('id') id: string) {
    return this.phoneService.findOne(contactId, id);
  }

  @MessagePattern(PHONE_PATTERNS.UPDATE)
  update(
    @Payload('contactId') contactId: string,
    @Payload('id') id: string,
    @Payload('body') body: UpdatePhoneDTO,
  ) {
    return this.phoneService.update(contactId, id, body);
  }

  @MessagePattern(PHONE_PATTERNS.REMOVE)
  remove(@Payload('contactId') contactId: string, @Payload('id') id: string) {
    return this.phoneService.delete(contactId, id);
  }
}
