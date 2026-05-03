import { Module } from "@nestjs/common";
import { SlidesServices } from "./slides.services";
import { SlideBuilderResolver } from "./builders";
import { PictureModule } from "pictires/pictures.module";
import { TitleSlideBuilder } from "./builders/TitleSlide.builder";
import { PictureWithCaptionBuilder } from "./builders/PictureWithCaption.builder";
import { slideBuilderProvider } from "./builders/builders.provider";
import { TitleAndContentBuilder } from "./builders/TitleAndContent.builder";
import { ContentWithCaptionBuilder } from "./builders/ContentWithCaption.builder";
import { TwoContentBuilder } from "./builders/TwoContent.builder";
import { ComparisonBuilder } from "./builders/Comparison.builder";

@Module({
    imports: [PictureModule],
    providers: [
        slideBuilderProvider,
        SlidesServices,
         SlideBuilderResolver,
          TitleSlideBuilder,
           PictureWithCaptionBuilder,
        TitleAndContentBuilder,
        ContentWithCaptionBuilder,
        TwoContentBuilder,
        ComparisonBuilder],
    exports: [SlidesServices]
})
export class SlideModule {} 