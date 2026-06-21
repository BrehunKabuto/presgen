import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { PrismaModule } from "prisma/prisma.module";
import { BrevoClient } from "@getbrevo/brevo";


@Module({
    providers: [MailService, BrevoClient],
    imports: [PrismaModule],
    exports: [MailService]
})
export class MailModule{}