import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async getByID(id: string) {
    return this.userRepository.findById(id);
  }
}
