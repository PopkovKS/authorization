import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from "./services/prisma.services";
import { hash } from 'bcrypt';
import { Prisma } from "@prisma/client";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly prismaService: PrismaService) {
    }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('/login')
    async login(@Body() body) {
        return body

    }

    @Post('/registration')
    async registration(@Body() body) {
        try {
            const hashedPassword = await hash(body.password, 10)

            const result = await this.prismaService.users.create({
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
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002'
            ) {
                throw new ConflictException(`Email ${body.email} already used.`);
            } else {
                throw new Error(e);
            }
        }
    }
}
