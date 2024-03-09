import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private entity: Repository<Auth>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.entity.findOne({
      where: {
        email: loginDto.email,
        password: loginDto.password,
      },
    });
  }

  async register(registerDto: LoginDto) {
    return await this.entity.save(registerDto);
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: LoginDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
