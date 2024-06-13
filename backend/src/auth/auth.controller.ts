import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDTO } from './dtos/sigin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    console.log('user', user);
    await this.authService.addUser(user);
  }

  @Post('signin')
  async signIn(@Body() user: SigninUserDTO) {
    return await this.authService.signIn(user);
  }

  //   @Post('signout')
  //   async signOut() {
  //     return 'signout';
  //   }

  //   @Post('me')
  //   async me() {
  //     return 'me';
  //   }
}
