import { IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  @IsOptional()
  readonly nickname: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('CN')
  readonly phone: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
