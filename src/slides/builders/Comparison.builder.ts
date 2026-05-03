import { ISlide } from "pptx-automizer/dist";
import { BaseSlideDto } from "../dto/BaseSlide.dto";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { ComparisonDto } from "../dto/Comparison.dto";

export class ComparisonBuilder extends BaseSlideBuilder{

    name="comparison"
    build(slideData: ComparisonDto, slideInstance: ISlide): void {
        this.setText(slideInstance, "Title", slideData.title)
        this.setText(slideInstance, "First Text Placeholder", slideData.firstCollumTitle)
        this.setText(slideInstance,"First Content Placeholder", slideData.firstCollumContent)
        this.setText(slideInstance,"Second Text Placeholder", slideData.secondCollumTitle)
        this.setText(slideInstance,"Second Content Placeholder", slideData.secondCollumContent)
    }
}