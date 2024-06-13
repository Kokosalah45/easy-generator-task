import { Request } from 'express';
import { UserSession } from './UserSession';

export class RequestWithUser extends Request {
  user: UserSession;
}
