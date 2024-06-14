import { User } from '../../users/entities/user';

export class SigninUserDTO extends User {
  email: string;
  password: string;
}
