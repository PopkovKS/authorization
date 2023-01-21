import { Injectable } from '@nestjs/common';
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CarsService {
    constructor(private readonly prisma: PrismaService) {
    }

    getCars(userId) {
        return this.prisma.cars.findMany({
            where: {
                userId: userId
            }
        })
    }

    createCar(car, user) {
        return this.prisma.cars.create({
            data: {
                ...car,
                userId: user.id
            },
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
