import { PrismaService, ValidationService } from '@app/common';
import {
  ContactDTO,
  CreateContactDTO,
  CreatePhoneDTO,
  PhoneDTO,
  UpdateContactDTO,
  UpdatePhoneDTO,
} from '@app/shared/dto';
import { ContactsSchema, PhoneSchema } from '@app/shared/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';

@Injectable()
export class ContactsService {
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

  async create(user: User, request: CreateContactDTO): Promise<ContactDTO> {
    const createContactRequest = this.validation.validate(
      ContactsSchema.CreateContact,
      request,
    );

    return this.prismaService.contact.create({
      data: {
        name: createContactRequest.name,
        email: createContactRequest.email,
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findAll(user: User): Promise<ContactDTO[]> {
    return this.prismaService.contact.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(user: User, id: string): Promise<ContactDTO> {
    const contact = await this.prismaService.contact.findUnique({
      where: {
        id,
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        Phone: {
          select: {
            id: true,
            phone: true,
          },
        },
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return contact;
  }

  async update(user: User, id: string, request: UpdateContactDTO) {
    const updateContactRequest = this.validation.validate(
      ContactsSchema.UpdateContact,
      {
        ...request,
        id,
      },
    );

    const contact = await this.prismaService.contact.findUnique({
      where: {
        id: updateContactRequest.id,
        userId: user.id,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return this.prismaService.contact.update({
      where: {
        id: updateContactRequest.id,
        userId: user.id,
      },
      data: {
        ...updateContactRequest,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async delete(user: User, id: string) {
    const contact = await this.prismaService.contact.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return this.prismaService.contact.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  }

  async createPhone(
    contactId: string,
    request: CreatePhoneDTO,
  ): Promise<PhoneDTO> {
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

  async findOnePhone(contactId: string, phoneId: string): Promise<PhoneDTO> {
    await this.contactExists(contactId);

    return this.phoneExists(phoneId);
  }

  async updatePhone(
    contactId: string,
    phoneId: string,
    request: UpdatePhoneDTO,
  ): Promise<PhoneDTO> {
    const updatePhoneRequest = this.validation.validate(
      PhoneSchema.UpdatePhone,
      { ...request, id: phoneId },
    );

    await this.contactExists(contactId);
    await this.phoneExists(phoneId);
    await this.phoneNumberExists(updatePhoneRequest.phone!);

    return this.prismaService.phone.update({
      where: {
        id: phoneId,
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

  async deletePhone(contactId: string, phoneId: string) {
    await this.contactExists(contactId);
    await this.phoneExists(phoneId);

    return this.prismaService.phone.delete({
      where: { id: phoneId, contactId },
    });
  }
}
