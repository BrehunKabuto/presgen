import { Module } from "@nestjs/common";
import { UserModule } from "user/user.module";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.services";
import { TokenModule } from "token/token.module";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaModule } from "prisma/prisma.module";
import { MailModule } from "mail/mail.module";

@Module({
    providers: [AuthServices, JwtStrategy],
    imports: [UserModule, TokenModule, PrismaModule, MailModule],
    controllers: [AuthController]
})
export class AuthModule{}