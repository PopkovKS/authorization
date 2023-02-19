import { Injectable } from '@nestjs/common';
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class ImgService {
    constructor(private prisma: PrismaService) {
    }

    async createImg(image, car) {
        return this.prisma.img.create({
            data: {
                ...image,
                car: car.id
            },
        })
    }
}
