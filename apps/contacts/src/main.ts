import { NestFactory } from '@nestjs/core';
import { ContactsModule } from './contacts.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ErrorFilter } from '@app/common/filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = Number(process.env.CONTACTS_SERVICE_PORT) || 3002;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ContactsModule,
    {
      transport: Transport.TCP,
      options: {
        port: port,
      },
    },
  );
  app.useGlobalFilters(new ErrorFilter());
  await app.listen();

  Logger.log(
    `🚀 Contacts service is running on: http://${process.env.CONTACTS_SERVICE_HOST ?? 'localhost'}:${port}`,
  );
}
void bootstrap();
