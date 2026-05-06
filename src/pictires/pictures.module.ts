import { Module } from "@nestjs/common";
import { PexelsPhotoServices as PexelsPictureServices } from "./Pexels.service";
import { PictureService } from "./Pictures.service";
import { StorageModule } from "/storage/storage.modules";


@Module({

    providers: [PexelsPictureServices, PictureService],
    exports: [PictureService],
    imports: [StorageModule]
})
export class PictureModule{}