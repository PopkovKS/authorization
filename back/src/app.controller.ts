import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from "./services/prisma.services";
import { hash } from 'bcrypt';

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
    }
}
