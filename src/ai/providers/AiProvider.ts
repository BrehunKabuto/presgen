export interface AiProvider{
    name: string
    generateSlides(message: any[], options?: any): Promise<string>
}