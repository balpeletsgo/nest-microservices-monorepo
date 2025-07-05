import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          port: Number(process.env.AUTH_SERVICE_PORT) || 3001,
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
