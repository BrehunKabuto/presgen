import  { ISlide, ModifyTextHelper } from "pptx-automizer";
import { ISliderBuilder } from "./Slide.builder";
import { BaseSlideDto } from "../dto/BaseSlide.dto";


export class BaseSlideBuilder implements ISliderBuilder {
    name= "base"

    build(slideData: BaseSlideDto, slideInstance: ISlide): void {}
    setText(slideInstance: ISlide, elementName: string, title: string){
        slideInstance.modifyElement(elementName, ModifyTextHelper.setText(title))
    }

}