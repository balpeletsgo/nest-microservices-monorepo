import { MicroserviceErrorHandler } from '@app/common/utils';
import {
  AuthResponseDTO,
  SignInDTO,
  SignUpDTO,
  WebResponseDTO,
} from '@app/shared/dto';
import { AUTH_PATTERNS } from '@app/shared/patterns';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  @Post('sign_up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() body: SignUpDTO,
  ): Promise<WebResponseDTO<AuthResponseDTO>> {
    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.authClient.send<AuthResponseDTO>(AUTH_PATTERNS.SIGN_UP, {
          body,
        }),
      ),
    );

    return {
      success: true,
      status: HttpStatus.CREATED,
      message: 'User signed up successfully',
      data: result,
    };
  }

  @Post('sign_in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInDTO,
  ): Promise<WebResponseDTO<AuthResponseDTO>> {
    const result = await lastValueFrom(
      MicroserviceErrorHandler.handleMicroserviceResponse(
        this.authClient.send<AuthResponseDTO>(AUTH_PATTERNS.SIGN_IN, {
          body,
        }),
      ),
    );

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'User signed in successfully',
      data: result,
    };
  }
}
