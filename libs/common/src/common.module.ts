import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ValidationService } from './validation';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [PrismaService, ValidationService, JwtStrategy],
  exports: [PrismaService, ValidationService, JwtModule, PassportModule],
})
export class CommonModule {}
