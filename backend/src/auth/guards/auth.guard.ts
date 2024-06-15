import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RequestWithUser } from '../interfaces/RequestWithUser';

type Req = RequestWithUser & {
  headers: { authorization?: string };
  cookies: { access_token?: string };
};
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Req>();

    const token =
      request.headers.authorization?.split(' ')[1] ||
      request.cookies?.access_token ||
      '';

    console.log(token);
    if (!token) {
      return false;
    }

    const data = await this.authService.introSpectToken(token);

    if (!data) {
      return false;
    }

    request.user = data;

    return true;
  }
}
