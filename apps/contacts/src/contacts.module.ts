import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
