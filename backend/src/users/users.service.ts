import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getByEmail(email: string) {
    return await this.userRepository.findByField('email', email);
  }
  async create(data: CreateUserDto) {
    return await this.userRepository.create(data);
  }
}
