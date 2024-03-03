import { HttpException } from '@nestjs/common';

export class CompanyNotFoundException extends HttpException {
  constructor() {
    super('Company not found', 404);
  }
}

export class CompanyAlreadyExistException extends HttpException {
  constructor() {
    super('Company already exist', 404);
  }
}
