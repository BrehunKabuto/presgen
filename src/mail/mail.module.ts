import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { PrismaModule } from "prisma/prisma.module";


@Module({
    providers: [MailService],
    imports: [PrismaModule],
    exports: [MailService]
})
export class MailModule{}