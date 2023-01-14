import { Injectable } from '@nestjs/common';
import { PrismaService } from "nestjs-prisma";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.prisma.users.findUnique({
            where: {
                email
            }
        })
    }
}