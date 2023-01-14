import { Injectable } from '@nestjs/common';
import { PrismaService } from "../services/prisma.services";

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async findOne(email: string): Promise<User | undefined> {
        return await this.prismaService.users.findUnique({
            where: {
                email
            }
        })
    }
}