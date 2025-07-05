import { PrismaService, ValidationService } from '@app/common';
import {
  ContactDTO,
  CreateContactDTO,
  UpdateContactDTO,
} from '@app/shared/dto';
import { ContactsSchema } from '@app/shared/schemas';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';

@Injectable()
export class ContactsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validation: ValidationService,
  ) {}

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
}
