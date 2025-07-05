import { JwtAuthGuard } from '@app/common/guards';
import { UserRequest } from '@app/common/interface';
import { MicroserviceErrorHandler } from '@app/common/utils';
import { WebResponseDTO } from '@app/shared/dto';
import {
  ContactDTO,
  CreateContactDTO,
  UpdateContactDTO,
} from '@app/shared/dto/contacts.dto';
import { CONTACTS_PATTERNS } from '@app/shared/patterns';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CONTACTS_SERVICE } from './constant';

@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(
    @Inject(CONTACTS_SERVICE)
    private contactsClient: ClientProxy,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: UserRequest,
    @Body() body: CreateContactDTO,
  ): Promise<WebResponseDTO<ContactDTO>> {
    const user = req.user;

    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.contactsClient.send<ContactDTO>(CONTACTS_PATTERNS.CREATE, {
          user,
          body,
        }),
      ),
    );

    return {
      success: true,
      status: 201,
      message: 'Contact created successfully',
      data: result,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: UserRequest) {
    const user = req.user;

    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.contactsClient.send<ContactDTO[]>(CONTACTS_PATTERNS.FIND_ALL, {
          user,
        }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Contacts retrieved successfully',
      data: result,
    };
  }

  @Get(':id')
  async findOne(
    @Req() req: UserRequest,
    @Param('id') id: string,
  ): Promise<WebResponseDTO<ContactDTO>> {
    const user = req.user;

    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.contactsClient.send<ContactDTO>(CONTACTS_PATTERNS.FIND_ONE, {
          user,
          id,
        }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Contact retrieved successfully',
      data: result,
    };
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: UserRequest,
    @Param('id') id: string,
    @Body() body: UpdateContactDTO,
  ): Promise<WebResponseDTO<ContactDTO>> {
    const user = req.user;

    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.contactsClient.send<ContactDTO>(CONTACTS_PATTERNS.UPDATE, {
          user,
          id,
          body,
        }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Contact updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Req() req: UserRequest,
    @Param('id') id: string,
  ): Promise<WebResponseDTO<void>> {
    const user = req.user;

    await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.contactsClient.send(CONTACTS_PATTERNS.REMOVE, { user, id }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Contact removed successfully',
    };
  }
}
