import { ISlide } from "pptx-automizer/dist";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { TitleAndContentDto } from "../dto/TitleAndContent.dto";

export class TitleAndContentBuilder extends BaseSlideBuilder {

    name = "titleAndContent"

    build(slideData: TitleAndContentDto, slideInstance: ISlide): void {
        this.setText(slideInstance, "Title", slideData.title)
        this.setText(slideInstance, 'Content Placeholder', slideData.content)
    } 
}