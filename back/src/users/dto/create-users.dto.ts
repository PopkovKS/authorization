import { Cars } from '../../cars/dto/create-cars.dto';
import { ApiProperty } from '@nestjs/swagger';

export class Users {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    password: string;

    @ApiProperty({ isArray: true, type: () => Cars })
    cars: Cars[];
}
