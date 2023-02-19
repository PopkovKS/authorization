import { ApiProperty } from "@nestjs/swagger";
import { Cars } from "../../cars/dto/create-cars.dto";

export class Img {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    image: string;

    @ApiProperty({ isArray: true, type: () => Cars })
    Cars: Cars[];

}
