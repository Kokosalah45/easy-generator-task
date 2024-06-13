import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { User } from '../../users/entities/user';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {
    message:
      'Password must contain one uppercase letter, one lowercase letter and one number and must be between 10 and 20 characters long',
  })
  password: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9\s]*$/, {
    message: 'Name must contain only letters and numbers',
  })
  name: string;
}
