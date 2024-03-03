import { HttpException } from '@nestjs/common';

export class UserTasksNotFoundException extends HttpException {
  constructor() {
    super('User task not found', 404);
  }
}
