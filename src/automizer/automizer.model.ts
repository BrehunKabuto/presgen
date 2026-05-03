import { Module } from "@nestjs/common"
import { AutomizerProvider } from "./automizer.provider"

@Module({
    providers: [AutomizerProvider],
    exports: ["AUTOMIZER"],
    })
export class AutomizerModule {} 