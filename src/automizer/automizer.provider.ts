import {Automizer} from "pptx-automizer";
import * as path from "path";

export const AutomizerProvider = {

    provide: "AUTOMIZER",
    useFactory:  () =>  {
        return new Automizer({
           templateDir: path.join(process.cwd(), "src/automizer/templates"),
           mediaDir: path.join(process.cwd(), "src/temp/images"),
           outputDir: path.join(process.cwd(), "src/automizer/output"),
            autoImportSlideMasters: true,
              removeExistingSlides: false,
        })
    } 
}
