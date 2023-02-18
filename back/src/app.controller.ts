import {
    Body,
    ConflictException,
    Controller,
    Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from "nestjs-prisma";
import {Prisma} from "@prisma/client";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService) {
    }
    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200})
    @Post('/registration')
    async registration(@Body() body) {
        try {

            // const saltRounds = 10
            //
            // bcrypt.genSalt(saltRounds, function(err, salt) {
            //
            // });


            const hashedPassword = await bcrypt.hash(body.password, 10)

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
