import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./services/prisma.services";
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [
      AppService,
    PrismaService,
  ],
})
export class AppModule {}