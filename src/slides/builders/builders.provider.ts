import { BaseSlideBuilder } from "./BaseSlide.builder";
import { ComparisonBuilder } from "./Comparison.builder";
import { ContentWithCaptionBuilder } from "./ContentWithCaption.builder";
import { PictureWithCaptionBuilder } from "./PictureWithCaption.builder";
import { TitleAndContentBuilder } from "./TitleAndContent.builder";
import { TitleSlideBuilder } from "./TitleSlide.builder";
import { TwoContentBuilder } from "./TwoContent.builder";

export const slideBuilderProvider = { 

    provide: "SLIDE_BUILDER",
    useFactory: (
        
        titleSlide :TitleSlideBuilder,
        pictureWithCaption: PictureWithCaptionBuilder,
        titleAndContent: TitleAndContentBuilder,
        contentWithCaption: ContentWithCaptionBuilder,
        twoContent: TwoContentBuilder,
        comparison: ComparisonBuilder
    ) => {

        return [titleSlide, pictureWithCaption, titleAndContent, contentWithCaption, twoContent, comparison]
    },
    inject: [TitleSlideBuilder, PictureWithCaptionBuilder, TitleAndContentBuilder, ContentWithCaptionBuilder, TwoContentBuilder, ComparisonBuilder]

}