import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CarsService } from "./cars.service";

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getCars(
        @Request() req?,
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('orderBy') orderBy?: string
    ) {
        return this.carsService.getCars(req.user.id, {skip: Number(skip), take: Number(take), orderBy})
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
    @Delete('delete')
    delCars(@Query() query) {
        const ids = JSON.parse(query.ids)
        return this.carsService.delCars(ids)
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
