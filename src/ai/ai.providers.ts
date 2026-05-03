import { OpenAiProvider } from "./providers/openAi.provider"

export const AiProviderFactory = {

    provide: "AI_PROVIDERS",
    useFactory: (
        openAi: OpenAiProvider
    ) => {
        return[openAi]
    },
    inject: [OpenAiProvider]
} 