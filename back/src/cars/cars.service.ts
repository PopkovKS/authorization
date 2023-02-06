import { Injectable } from '@nestjs/common';
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CarsService {
    constructor(private readonly prisma: PrismaService) {
    }


    async getCars(userId, params: {
        skip?: number;
        take?: number;
        orderBy?: string;
    }) {
        const {skip, take, orderBy} = params;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.cars.findMany({
                skip,
                take,
                // orderBy: {
                //     brand: orderBy
                // },
                where: {
                    userId
                },
            }),
            this.prisma.cars.count({
                where: {
                    userId
                }
            }),
        ])
        return {data, total}

        //    const data = await this.prisma.cars.findMany({
        //         skip,
        //         take,
        //         where: {
        //             userId
        //         },
        //     })
        //    const total = await this.prisma.cars.count({
        //         where: {
        //             userId
        //         }
        //     })
        // return {data, total}
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

    delCars(ids) {
        return this.prisma.cars.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
    }

    updateCar(car, id) {
        return this.prisma.cars.update({
            where: {
                id
            },
            data: car
        })

    }
}
