import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ImgService } from "./img.service";
import { Cars } from "../cars/dto/create-cars.dto";
import { Img } from "./dto/img.dto";

@Controller('img')
export class ImgController {
    constructor(
        private imgService: ImgService,
        // private car: Cars,
        // private image: Img
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Put('')
    createImg(
        @Body()
            // car: Cars,
            image: Img
    ) {
        return this.imgService.createImg(image.id, image)
    }
}
