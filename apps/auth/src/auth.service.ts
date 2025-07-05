import { PrismaService } from '@app/common/database';
import { ValidationService } from '@app/common/validation';
import { AuthResponseDTO, SignInDTO, SignUpDTO } from '@app/shared/dto';
import { AuthSchema } from '@app/shared/schemas';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly validationService: ValidationService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(request: SignUpDTO): Promise<AuthResponseDTO> {
    const signUpRequest = this.validationService.validate(
      AuthSchema.SignUp,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: { email: signUpRequest.email },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(signUpRequest.password, 10);

    return this.prismaService.user.create({
      data: {
        name: signUpRequest.name,
        email: signUpRequest.email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    });
  }

  async signIn(request: SignInDTO): Promise<AuthResponseDTO> {
    const signInRequest = this.validationService.validate(
      AuthSchema.SignIn,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: { email: signInRequest.email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      signInRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { id: user.id };

    const token = await this.jwt.signAsync(payload, {
      algorithm: 'HS256',
    });

    return {
      access_token: token,
    };
  }
}
