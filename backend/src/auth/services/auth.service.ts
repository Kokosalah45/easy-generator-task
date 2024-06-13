import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SigninUserDTO } from '../dtos/sigin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async signIn(user: SigninUserDTO) {
    const userFound = await this.userService.getByEmail(user.email);
    if (!userFound) {
      return null;
    }
    const isPasswordValid = await this.passwordService.comparePassword(
      user.password,
      userFound.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    const accessToken = this.jwtService.sign({
      email: userFound.email,
    });
    return {
      access_token: accessToken,
    };
  }

  async addUser(user: CreateUserDto) {
    const password = await this.passwordService.hashPassword(user.password);
    return await this.userService.create({ ...user, password });
  }
}
