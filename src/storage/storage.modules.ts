import { Module } from "@nestjs/common";
import { PictureStorage } from "./pictureStorage.services";
import { PrismaModule } from "prisma/prisma.module";
import { PresentationStorage } from "./presentationStorage.services";

@Module({

    providers: [PictureStorage, PresentationStorage],
    exports: [PictureStorage, PresentationStorage],
    imports: [PrismaModule]
})
export class StorageModule{}