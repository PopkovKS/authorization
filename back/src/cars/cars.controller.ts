import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
}
