import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UnauthorizedException, UseGuards, Request
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';
import { PrismaService } from "./services/prisma.services";
import { hash } from 'bcrypt';
import { Prisma } from "@prisma/client";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly prismaService: PrismaService,
        private readonly authService: AuthService) {
    }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
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
                e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
            ) {
                throw new ConflictException(`Email ${body.email} already used.`);
            } else {
                throw new Error(e);
            }
        }
    }
}
