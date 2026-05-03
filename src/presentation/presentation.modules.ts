import { Module } from "@nestjs/common"
import { PresentationServices } from "./presentation.services"
import { PresentationController } from "./presentation.controllers"
import { SlideModule } from "/slides/slides.modules"
import { AutomizerModule } from "/automizer/automizer.model"
import { PictureModule } from "/pictires/pictures.module"
import { AiModule } from "/ai/ai.module"
import { PictureStorageModule } from "/storage/storage.modules"

@Module({
    imports: [SlideModule, AutomizerModule, PictureModule, AiModule, PictureStorageModule],
    controllers: [PresentationController],
    providers: [PresentationServices],
}) 
export class PresentatiionModules{} 