import {
  KafkaOptions,
  NestMicroservice,
  Transport,
} from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';

const getKafkaMicroserviceOptions = (groupId: string): KafkaOptions => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId,
      },
    },
  };
};

function setUp<T extends NestMicroservice>(app: T) {
  app.listen();
}

export const microservices = {
  BillingService: {
    module: BillingModule,
    options: getKafkaMicroserviceOptions('billing-consumer'),
    setUp,
  },
  AuthService: {
    module: AuthModule,
    options: getKafkaMicroserviceOptions('auth-consumer'),
    setUp,
  },
};
