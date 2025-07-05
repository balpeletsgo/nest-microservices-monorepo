import { Module } from '@nestjs/common';
import { PhoneController } from './phone.controller';
import { CommonModule } from '@app/common';
import { PHONE_SERVICE } from './constant';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CommonModule,
    ClientsModule.register([
      {
        name: PHONE_SERVICE,
        transport: Transport.TCP,
        options: {
          port: Number(process.env.PHONE_SERVICE_PORT) || 3003,
        },
      },
    ]),
  ],
  controllers: [PhoneController],
  providers: [JwtService],
})
export class PhoneModule {}
