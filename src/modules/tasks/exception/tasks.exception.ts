import { HttpException } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor() {
    super('Task not found', 404);
  }
}
