import { Injectable } from '@nestjs/common';
import { PrismaService } from "../services/prisma.services";
import { JwtService } from "@nestjs/jwt";
import { compare } from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prismaService.users.findUnique({
            where: {
                email
            }
        });

        const match = await compare(pass, user.password);

        if (user && match) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

     login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

