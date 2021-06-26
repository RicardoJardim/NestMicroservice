import { IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(5, {
    message: 'Username must be longer than or equal to 5 characters',
  })
  username: string;

  @IsString()
  @MinLength(5, {
    message: 'Password must be longer than or equal to 5 characters',
  })
  password: string;
}
