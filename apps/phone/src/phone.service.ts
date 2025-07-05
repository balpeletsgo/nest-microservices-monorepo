import { PrismaService, ValidationService } from '@app/common';
import { CreatePhoneDTO, PhoneDTO, UpdatePhoneDTO } from '@app/shared/dto';
import { PhoneSchema } from '@app/shared/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PhoneService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validation: ValidationService,
  ) {}

  private async contactExists(contactId: string): Promise<boolean> {
    const contact = await this.prismaService.contact.findUnique({
      where: { id: contactId },
      select: { id: true },
    });

    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }

    return !!contact;
  }

  private async phoneExists(phoneId: string): Promise<PhoneDTO> {
    const phone = await this.prismaService.phone.findUnique({
      where: { id: phoneId },
      select: {
        id: true,
        phone: true,
        contact: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!phone) {
      throw new HttpException('Phone not found', HttpStatus.NOT_FOUND);
    }

    return phone;
  }

  private async phoneNumberExists(phone: string): Promise<boolean> {
    const phoneExists = await this.prismaService.phone.findFirst({
      where: {
        phone,
      },
    });

    if (phoneExists) {
      throw new HttpException(
        'Phone number already exists',
        HttpStatus.CONFLICT,
      );
    }

    return !!phoneExists;
  }

  async create(contactId: string, request: CreatePhoneDTO): Promise<PhoneDTO> {
    const createPhoneRequest = this.validation.validate(
      PhoneSchema.CreatePhone,
      request,
    );

    await this.contactExists(contactId);
    await this.phoneNumberExists(createPhoneRequest.phone);

    return this.prismaService.phone.create({
      data: {
        phone: createPhoneRequest.phone,
        contactId,
      },
      select: {
        id: true,
        phone: true,
      },
    });
  }

  async findOne(contactId: string, id: string): Promise<PhoneDTO> {
    await this.contactExists(contactId);

    const phone = await this.phoneExists(id);

    return phone;
  }

  async update(
    contactId: string,
    id: string,
    request: UpdatePhoneDTO,
  ): Promise<PhoneDTO> {
    const updatePhoneRequest = this.validation.validate(
      PhoneSchema.UpdatePhone,
      { ...request, id },
    );

    await this.contactExists(contactId);
    await this.phoneNumberExists(updatePhoneRequest.phone!);

    return this.prismaService.phone.update({
      where: {
        id,
        contactId,
      },
      data: {
        phone: updatePhoneRequest.phone,
      },
      select: {
        id: true,
        phone: true,
      },
    });
  }

  async delete(contactId: string, id: string) {
    await this.contactExists(contactId);
    await this.phoneExists(id);

    return this.prismaService.phone.delete({
      where: { id, contactId },
    });
  }
}
