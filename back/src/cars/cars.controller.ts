import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
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
    createCar(@Body() body) {
        return this.carsService.createCar(body)
    }
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delCar(@Param('id') id) {
        return this.carsService.delCar(+id)
    }
}
