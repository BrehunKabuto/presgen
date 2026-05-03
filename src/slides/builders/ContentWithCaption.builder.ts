import { ISlide } from "pptx-automizer/dist";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { ContentWithCaptionDto } from "../dto/ContetWithCaption.dto";

export class ContentWithCaptionBuilder extends BaseSlideBuilder {
    name="contentWithCaption"

    build(slideData: ContentWithCaptionDto, slideInstance: ISlide): void {
          this.setText(slideInstance, "Title", slideData.title)
        this.setText(slideInstance, 'Content Placeholder', slideData.content)
        this.setText(slideInstance, "Text Placeholder", slideData.caption)
    }

} 