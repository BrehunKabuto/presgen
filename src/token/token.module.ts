import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports: [JwtModule, PrismaModule],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule{}