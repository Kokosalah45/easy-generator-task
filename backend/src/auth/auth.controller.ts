import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDTO } from './dtos/sigin-user.dto';
import { AlreadyExistException } from 'src/shared/errors/AlreadyExistException';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signUp(@Body() user: CreateUserDto) {
    const isUser = await this.authService.addUser(user);

    if (!isUser) {
      throw new AlreadyExistException('User');
    }

    return {
      message: 'User created successfully',
    };
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
