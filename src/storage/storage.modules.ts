import { Module } from "@nestjs/common";
import { PictureStorageService } from "./pictureStorage.services";

@Module({

    providers: [PictureStorageService],
    exports: [PictureStorageService]
})
export class PictureStorageModule{}