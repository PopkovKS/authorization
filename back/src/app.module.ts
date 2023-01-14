import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from "./users/users.module";
import {PrismaModule} from 'nestjs-prisma';
import { loggingMiddleware } from "./common/middleware/logging.middleware";



@Module({
  imports: [AuthModule, UsersModule, PrismaModule, PrismaModule.forRoot({
    isGlobal: true,
    prismaServiceOptions: {
      middlewares: [loggingMiddleware()], // configure your prisma middleware
    },
  }),],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
