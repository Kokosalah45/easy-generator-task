import { MongoRepository } from 'src/shared/adapters/MongoBaseRepository';
import { User } from '../entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends MongoRepository<User> {
  constructor(@InjectModel(User.name) private readonly entity: Model<User>) {
    super(entity);
  }
}
