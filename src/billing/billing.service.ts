import { Inject, Injectable } from '@nestjs/common';
import { GetUserRequest } from './dto/get-user-request.dto';
import { OrderCreatedEvent } from './events/order-created.event';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class BillingService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user: any) => {
        console.log({ user });
        console.log(
          `Billing user with id: ${user.stripeUserId} a price of $${orderCreatedEvent.price}...`,
        );
      });
  }
}
