import { Users } from '../../users/dto/create-users.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Img } from "../../img/dto/img.dto";

export class Cars {
    @ApiProperty({type: Number})
    id: number;

    @ApiProperty({type: () => Users})
    user: Users;

    @ApiProperty({type: Number})
    userId: number;

    @ApiProperty({type: String})
    brand: string;

    @ApiProperty({type: String})
    model: string;

    @ApiProperty({type: String})
    color: string;

    @ApiProperty({type: Number})
    mileage: number;

    @ApiProperty({type: Boolean, required: false, default: false})
    published?: boolean = false;

    @ApiProperty({ type: () => Img })
    image: Img;

    @ApiProperty({ type: Number })
    imageId: number;


}