import { Module } from "@nestjs/common";
import { AiService } from "./ai.service";
import { OpenAiClientProvider, OpenAiProvider } from "./providers/openAi.provider";
import { AiProviderFactory } from "./ai.providers";

@Module({

    providers: [
        AiService, 
        OpenAiProvider,
        AiProviderFactory,
        OpenAiClientProvider
        ],
    exports: [AiService],
    
})
export class AiModule{}