import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'YOUR_SECRET_KEY', // Gantilah dengan secret key Anda
        });
    }

    async validate(payload: any) {
        // Validasi user di sini jika diperlukan
        return { id: payload.id, name: payload.name, email: payload.email, role: payload.role };
    }
}
