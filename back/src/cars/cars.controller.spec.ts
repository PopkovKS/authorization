import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from "./cars.service";
import { PrismaService } from "nestjs-prisma";

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService, PrismaService],
    }).compile();

    carsService = new CarsService(prismaService);
    carsController = new CarsController(carsService);

    carsController = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(carsController).toBeDefined();
  });

  it('return array of cars', async () => {
    const result = {data:[{id: 58, userId: 1, brand: "bmw", model: "2", color: "2", mileage: 2}], total:1}
    jest.spyOn(carsService,  'getCars').mockImplementation((result) => {
      console.log(result)
      return result
    });
    expect( await carsController.getCars({user:{id:1}},'0','1')).toEqual(result);
  });

});
