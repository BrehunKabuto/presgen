import { ISlide } from "pptx-automizer/dist";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { TwoContentDto } from "../dto/TwoContent.builder";


export class TwoContentBuilder extends BaseSlideBuilder {

    name = "twoContent"

    build(slideData: TwoContentDto, slideInstance: ISlide): void {
        this.setText(slideInstance, "Title", slideData.title)
        this.setText(slideInstance, "First Content Placeholder", slideData.firstContent)
        this.setText(slideInstance, "Second Content Placeholder", slideData.secondContent)
    }
}