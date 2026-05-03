import { ISlide, ModifyImageHelper } from "pptx-automizer/dist";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { PictureWithCapationDto } from "../dto/PictureWithCaption.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PictureWithCaptionBuilder extends BaseSlideBuilder {
    name = "pictureWithCaption"
    build(slideData: PictureWithCapationDto, slideInstance: ISlide): void {
        this.setText(slideInstance,"Title", slideData.title)
        this.setText(slideInstance, "Text Placeholder",slideData.content )
        slideInstance.modifyElement("Picture Placeholder", ModifyImageHelper.setRelationTarget(slideData.PictureFileName ?? "default.png"))
    }
}