import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from "./users/users.module";
import { PrismaModule } from 'nestjs-prisma';
import { loggingMiddleware } from "./common/middleware/logging.middleware";
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cars } from "./cars/cars.entity";



@Module({
  imports: [AuthModule, UsersModule, PrismaModule,
    PrismaModule.forRoot({
    isGlobal: true,
    prismaServiceOptions: {
      middlewares: [loggingMiddleware()], // configure your prisma middleware
    },
  }),
  //   TypeOrmModule.forRoot({
  //   type: 'mysql',
  //   host: process.env.MYSQL_HOST,
  //   port: Number(process.env.MYSQL_PORT),
  //   username: process.env.MYSQL_USER,
  //   password: process.env.PASSWORD,
  //   database: process.env.MYSQL_DB,
  //   entities: [Cars],
  //   synchronize: true,
  // })
    ],
  controllers: [AppController, CarsController],
  providers: [CarsService],
})
export class AppModule {
}
