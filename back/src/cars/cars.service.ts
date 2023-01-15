import { Injectable } from '@nestjs/common';
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CarsService {
    constructor(private readonly prisma: PrismaService) {
    }

    getCars() {
        return this.prisma.cars.findMany()
    }

    createCar(car) {
        return this.prisma.cars.create({
            data: car
        })
    }

    delCar(id) {
        return this.prisma.cars.delete({
            where: {
                id
            }
        })
    }

    updateCar(car, id) {
        return this.prisma.cars.update({
            where: {
                id
            },
            data : car
        })

    }
}
