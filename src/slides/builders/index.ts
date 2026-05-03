import { TitleSlideBuilder } from "./TitleSlide.builder";
import { BaseSlideDto } from "../dto/BaseSlide.dto";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PictureWithCaptionBuilder } from "./PictureWithCaption.builder";
import { BaseSlideBuilder } from "./BaseSlide.builder";
import { ISliderBuilder } from "./Slide.builder";

@Injectable()
export class SlideBuilderResolver {

   
    constructor(
        @Inject("SLIDE_BUILDER") private  readonly  builders: ISliderBuilder[]
    ) {}
    private builderMap : Record<string, ISliderBuilder>
    onModuleInit(){
        this.builderMap = this.builders.reduce((acc, p) => {
                acc[p.name] = p;
                return acc
             }, {} as Record<string, ISliderBuilder>)
    }
    
    get(slide: BaseSlideDto) {
        const builder = this.builderMap[slide.type]

        if (!builder){
            throw new NotFoundException(`No builder registered for slide type: ${slide.type}`)
        }

        return  builder
    }

}