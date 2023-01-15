import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from "./users/users.module";
import {PrismaModule} from 'nestjs-prisma';
import { loggingMiddleware } from "./common/middleware/logging.middleware";
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, PrismaModule.forRoot({
    isGlobal: true,
    prismaServiceOptions: {
      middlewares: [loggingMiddleware()], // configure your prisma middleware
    },
  }),],
  controllers: [AppController, CarsController],
  providers: [CarsService],
})
export class AppModule {}
