import { Injectable } from "@nestjs/common";

import { BaseSlideDto } from "./dto/BaseSlide.dto"; 
import Automizer from "pptx-automizer";
import { SlideBuilderResolver } from "./builders";
import { SlideTypeMap } from "./slide-type";


@Injectable()
export class SlidesServices {
    constructor(private readonly slideBuilderResolver: SlideBuilderResolver) {}
    async create(slide: BaseSlideDto, pres: Automizer) {
        const Builder = this.slideBuilderResolver.get(slide)

         pres.addSlide( "root",this.slideTypeNumber(slide), (slideInstance => {
              Builder.build(slide,slideInstance) 
              } 
            )
        )
    }

     protected  slideTypeNumber(slide: BaseSlideDto): number {
        return SlideTypeMap[slide.type]
    }
}

 
