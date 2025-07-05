import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ErrorFilter } from '@app/common/filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = Number(process.env.AUTH_SERVICE_PORT) || 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
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
    `🚀 Auth service is running on: http://${process.env.HOST ?? 'localhost'}:${port}`,
  );
}
void bootstrap();
