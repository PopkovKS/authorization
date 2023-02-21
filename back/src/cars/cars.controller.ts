import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CarsService } from "./cars.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Cars } from "./dto/create-cars.dto";

@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService,
    ) {
    }

    @ApiOperation({summary: 'Получение всех машин'})
    @ApiResponse({status: 200, type: Cars})
    @UseGuards(JwtAuthGuard)
    @Get('')
    getCars(
        @Request() req,
        // @Query() query?: any
    ) {
        return this.carsService.getCars(req.user.id, req.query)
    }


    @UseGuards(JwtAuthGuard)
    @Post('create')
    createCar(
        @Request() req,
        // @Body() body
    ) {
        return this.carsService.createCar(req.user, req.body)
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
