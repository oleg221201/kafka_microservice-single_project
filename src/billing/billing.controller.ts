import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { OrderCreatedEvent } from './events/order-created.event';

@Controller()
export class BillingController implements OnModuleInit {
  constructor(
    private readonly billingService: BillingService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientKafka,
  ) {}

  onModuleInit() {
    this.authService.subscribeToResponseOf('get_user');
  }

  @EventPattern('order_created')
  handlerOrderCreated(data: OrderCreatedEvent) {
    this.billingService.handleOrderCreated(data);
  }
}
