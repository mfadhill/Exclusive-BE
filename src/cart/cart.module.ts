import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../lib/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../lib/db/jwtstrategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ThisIsASecret', // Gantilah dengan secret key Anda
      signOptions: { expiresIn: '1h' }, // Opsional, pengaturan waktu kadaluarsa token
    }),
  ],
  providers: [CartService, PrismaService, JwtStrategy],
  controllers: [CartController],
})

export class CartModule { }