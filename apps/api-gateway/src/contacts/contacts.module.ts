import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContactsController } from './contacts.controller';
import { CONTACTS_SERVICE } from './constant';
import { JwtService } from '@nestjs/jwt';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    ClientsModule.register([
      {
        name: CONTACTS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: Number(process.env.AUTH_SERVICE_PORT) || 3002,
        },
      },
    ]),
  ],
  controllers: [ContactsController],
  providers: [JwtService],
})
export class ContactsModule {}
