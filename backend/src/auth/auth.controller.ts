import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SigninUserDTO } from './dtos/sigin-user.dto';
import { AlreadyExistException } from 'src/shared/errors/AlreadyExistException';
import { AuthGuard } from './guards/auth.guard';
import { MeDTO } from './dtos/me.dto';
import { Request } from 'express';
import { RequestWithUser } from './interfaces/RequestWithUser';

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

  @UseGuards(AuthGuard)
  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Req() req: RequestWithUser): MeDTO {
    console.log(req.user);
    const meDTO = new MeDTO(req.user);
    return meDTO;
  }
}
