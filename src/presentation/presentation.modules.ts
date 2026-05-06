import { Module } from "@nestjs/common"
import { PresentationServices } from "./presentation.services"
import { PresentationController } from "./presentation.controllers"
import { SlideModule } from "/slides/slides.modules"
import { AutomizerModule } from "/automizer/automizer.model"
import { PictureModule } from "/pictires/pictures.module"
import { AiModule } from "/ai/ai.module"
import { StorageModule } from "/storage/storage.modules"
import { AwsModule } from "aws/aws.module"
import { TokenModule } from "token/token.module"

@Module({
    imports: [SlideModule, AutomizerModule, PictureModule, AiModule, StorageModule, AwsModule, StorageModule, TokenModule],
    controllers: [PresentationController],
    providers: [PresentationServices],
}) 
export class PresentatiionModules{} 