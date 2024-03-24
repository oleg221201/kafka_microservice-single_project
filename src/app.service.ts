import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './dto/create-order-request.dto';
import { OrderCreatedEvent } from './events/order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE')
    private readonly billingService: ClientKafka,
  ) {}

  createOrder({ userId, price }: CreateOrderRequest) {
    console.log({
      userId,
      price,
    });
    this.billingService.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}
