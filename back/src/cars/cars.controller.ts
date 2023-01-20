import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CarsService } from "./cars.service";

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getCars() {
        return this.carsService.getCars()
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createCar(
        @Body() body,
        @Request() req
    ) {
        return this.carsService.createCar(body, req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delCar(@Param('id') id) {
        return this.carsService.delCar(+id)
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    updateCar(
        @Param('id') id,
        @Body() body
    ) {
        return this.carsService.updateCar(body, +id)
    }
}
