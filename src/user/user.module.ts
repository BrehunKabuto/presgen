import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "prisma/prisma.module";
import { StorageModule } from "storage/storage.modules";

@Module({
    providers: [UserService],
    imports: [PrismaModule, StorageModule],
    exports: [UserService]
})
export class UserModule{} 