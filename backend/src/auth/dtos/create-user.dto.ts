import { User } from '../../users/entities/user';

export class CreateUserDto extends User {
  age: number;
  email: string;
  password: string;
  name: string;
}
