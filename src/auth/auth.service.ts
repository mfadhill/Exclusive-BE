import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../lib/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }
  async create(createAuthDto: CreateAuthDto) {
    try {
      const hashPassword = await bcrypt.hash(createAuthDto.password, 10);
      if (createAuthDto.role === undefined) {
        createAuthDto.role = Role.Buyer
      }
      const register = await this.prisma.user.create({
        data: {
          email: createAuthDto.email,
          name: createAuthDto.name,
          password: hashPassword,
          role: createAuthDto.role
        },
      });

      return {
        name: register.name,
        email: register.email,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_GATEWAY);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: { email: loginDto.email },
      });

      if (!findUser)
        throw new HttpException('check your input', HttpStatus.UNAUTHORIZED);

      const matchPassword = await bcrypt.compare(
        loginDto.password,
        findUser.password,
      );

      if (!matchPassword)
        throw new HttpException('check Your Input', HttpStatus.UNAUTHORIZED);

      const payload = {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        role: findUser.role
      };
      return { token: this.jwtService.sign(payload), test: payload };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: userId },
        include: {
          cart: true
        }
      });

      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
