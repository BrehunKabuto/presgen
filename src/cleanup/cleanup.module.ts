import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    providers: [CleanupModule],
    imports: [PrismaModule]
})
export class CleanupModule{}