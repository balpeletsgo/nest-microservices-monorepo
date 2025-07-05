import { SignInDTO, SignUpDTO } from '@app/shared/dto';
import { AUTH_PATTERNS } from '@app/shared/patterns';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.SIGN_UP)
  async signUp(@Payload('body') body: SignUpDTO) {
    return this.authService.signUp(body);
  }

  @MessagePattern(AUTH_PATTERNS.SIGN_IN)
  async signIn(@Payload('body') body: SignInDTO) {
    return this.authService.signIn(body);
  }
}
