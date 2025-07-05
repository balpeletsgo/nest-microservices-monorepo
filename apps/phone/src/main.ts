import { NestFactory } from '@nestjs/core';
import { PhoneModule } from './phone.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ErrorFilter } from '@app/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = Number(process.env.PHONE_SERVICE_PORT) || 3003;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PhoneModule,
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
    `🚀 Phone service is running on: http://${process.env.PHONE_SERVICE_HOST ?? 'localhost'}:${port}`,
  );
}

void bootstrap();
