import {
    Body,
    ConflictException,
    Controller,
    Post,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from "nestjs-prisma";
import {Prisma} from "@prisma/client";


@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {
    }

    @Post('/registration')
    async registration(@Body() body) {
        try {
            const hashedPassword = await hash(body.password, 10)

            const result = await this.prisma.users.create({
                data: {
                    ...body,
                    password: hashedPassword
                }

            })
            console.log(result)
            return {
                status: 'ok',
                message: `Пользователь ${body.email} зарегистрированн`
            }

        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
            ) {
                throw new ConflictException(`Email ${body.email} already used.`);
            } else {
                throw new Error(e);
            }
        }
    }
}
