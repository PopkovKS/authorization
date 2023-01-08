import { Injectable } from '@nestjs/common';
import { PrismaService } from "../services/prisma.services";

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prismaService.users.findUnique({
            where: {
                email
            }
        });
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
