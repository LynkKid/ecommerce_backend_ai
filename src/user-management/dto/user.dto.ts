import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  role_id: number;
}