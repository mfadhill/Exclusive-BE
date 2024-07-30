import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../lib/prisma/prisma.service';
import { JwtStrategy } from '../lib/db/jwtstrategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Gantilah dengan secret key Anda
      signOptions: { expiresIn: '1h' }, // Opsional, pengaturan waktu kadaluarsa token
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
