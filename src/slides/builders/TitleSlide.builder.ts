import { ISlide } from "pptx-automizer";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { TitleSlideDto } from "../dto/TitleSlide.dto";
 

export class TitleSlideBuilder extends BaseSlideBuilder {

    name = "title"
    build(slideData: TitleSlideDto, slideInstance: ISlide): void {
        
       this.setText(slideInstance, "Title", slideData.title)
       if(typeof slideData.subtitle !== 'string'){
            slideInstance.removeElement("Subtitle")
            return
        }
       this.setText(slideInstance, 'Subtitle', slideData.subtitle)
    }
}