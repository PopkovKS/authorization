import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from "../local.strategy";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "../services/prisma.services";

@Module({
  imports: [ PassportModule],
  providers: [
      AuthService,
    LocalStrategy,
    PrismaService
  ]
})
export class AuthModule {}
