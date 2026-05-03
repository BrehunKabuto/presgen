import  { ISlide }  from "pptx-automizer"; 
import { BaseSlideDto } from "../dto/BaseSlide.dto";
import { SlideType } from "../slide-type";

export interface ISliderBuilder {
    name: string
    build(slideData: BaseSlideDto, slideInstance: ISlide): void
    
}