export const SlideTypeMap = {
    title: 1,
    pictureWithCaption: 2,
    titleAndContent: 3,
    contentWithCaption:4,
    twoContent:5,
    comparison:6 
}

export type SlideType = keyof typeof SlideTypeMap