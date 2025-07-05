import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export class PhoneModule {}
