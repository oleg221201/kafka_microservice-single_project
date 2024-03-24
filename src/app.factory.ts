import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, INestMicroservice, Type } from '@nestjs/common';
import { microservices } from './app.microservices';
import { MicroserviceOptions } from '@nestjs/microservices';

export async function appFactory(): Promise<
  [
    INestApplication | INestMicroservice,
    Type,
    <T extends INestApplication | INestMicroservice>(
      app: T,
    ) => void | Promise<void>,
  ]
> {
  const microserviceName = process.env.MS_NAME;
  console.log({ microserviceName });
  const microservice = microservices[microserviceName];

  if (microserviceName && typeof microservice !== 'undefined') {
    return [
      await NestFactory.createMicroservice<MicroserviceOptions>(
        microservice.module,
        microservice.options,
      ),
      microservice.module,
      microservice.setUp,
    ];
  }

  return [
    await NestFactory.create(AppModule),
    AppModule,
    (server) => {
      server.listen(process.env.PORT || 4000);
    },
  ];
}
