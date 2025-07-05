import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [AuthModule, ContactsModule, PhoneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
