import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContactsController } from './contacts.controller';
import { CONTACTS_SERVICE } from './constant';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CONTACTS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [ContactsController],
  providers: [],
})
export class ContactsModule {}
