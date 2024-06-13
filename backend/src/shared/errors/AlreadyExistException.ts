import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistException extends HttpException {
  constructor(entity: string) {
    super(`${entity} already exists`, HttpStatus.CONFLICT);
  }
}
