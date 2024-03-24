import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './dto/get-user-request.dto';

@Injectable()
export class AuthService {
  private readonly users: any[] = [
    { userId: '123', stripeUserId: '456' },
    { userId: '78', stripeUserId: '90' },
  ];

  getUser(getUserRequest: GetUserRequest) {
    console.log({ getUserRequest });
    console.log(
      this.users.find((user) => user.userId === getUserRequest.userId),
    );
    return this.users.find((user) => user.userId === getUserRequest.userId);
  }
}
