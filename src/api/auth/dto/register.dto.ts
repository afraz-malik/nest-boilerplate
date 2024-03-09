// auth.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @ApiProperty()
  instituteName: string;

  @IsString()
  @ApiProperty()
  instituteType: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}
