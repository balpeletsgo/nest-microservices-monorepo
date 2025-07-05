import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ValidationService } from './validation';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  providers: [PrismaService, ValidationService],
  exports: [PrismaService, JwtModule, ValidationService],
})
export class CommonModule {}
