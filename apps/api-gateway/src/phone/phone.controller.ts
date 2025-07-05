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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PHONE_SERVICE } from './constant';
import { JwtAuthGuard } from '@app/common/guards';
import {
  CreatePhoneDTO,
  PhoneDTO,
  UpdatePhoneDTO,
  WebResponseDTO,
} from '@app/shared/dto';
import { lastValueFrom } from 'rxjs';
import { MicroserviceErrorHandler } from '@app/common';
import { PHONE_PATTERNS } from '@app/shared/patterns';

@UseGuards(JwtAuthGuard)
@Controller('phones')
export class PhoneController {
  constructor(
    @Inject(PHONE_SERVICE)
    private phoneClient: ClientProxy,
  ) {}

  @Post(':contactId')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('contactId') contactId: string,
    @Body() body: CreatePhoneDTO,
  ): Promise<WebResponseDTO<PhoneDTO>> {
    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.phoneClient.send<PhoneDTO>(PHONE_PATTERNS.CREATE, {
          contactId,
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

  @Get(':contactId/phone/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('contactId') contactId: string,
    @Param('id') id: string,
  ): Promise<WebResponseDTO<PhoneDTO>> {
    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.phoneClient.send<PhoneDTO>(PHONE_PATTERNS.FIND_ONE, {
          contactId,
          id,
        }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Phone retrieved successfully',
      data: result,
    };
  }

  @Patch(':contactId/phone/:id')
  async update(
    @Param('contactId') contactId: string,
    @Param('id') id: string,
    @Body() body: UpdatePhoneDTO,
  ) {
    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.phoneClient.send<PhoneDTO>(PHONE_PATTERNS.UPDATE, {
          contactId,
          id,
          body,
        }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Phone updated successfully',
      data: result,
    };
  }

  @Delete(':contactId/phone/:id')
  async remove(@Param('contactId') contactId: string, @Param('id') id: string) {
    await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.phoneClient.send<void>(PHONE_PATTERNS.REMOVE, {
          contactId,
          id,
        }),
      ),
    );

    return {
      success: true,
      status: 200,
      message: 'Phone deleted successfully',
    };
  }
}
