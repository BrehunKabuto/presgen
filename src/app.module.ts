import { Module } from '@nestjs/common';
import { SlideModule } from './slides/slides.modules';
import { AutomizerModule } from './automizer/automizer.model';
import { PresentatiionModules } from './presentation/presentation.modules';
import { StorageModule } from './storage/storage.modules';
import { PictureModule } from './pictires/pictures.module';
import { CatchEverythingFilter } from './common/filters/catchEverithing.filter';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.modules';
import { PrismaModule } from 'prisma/prisma.module';
import { TokenModule } from 'token/token.module';
import { AwsModule } from 'aws/aws.module';
import { UserController } from 'user/user.controller';
import { MailModule } from 'mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupModule } from 'cleanup/cleanup.module';



@Module({
    imports: [
        SlideModule,
        AutomizerModule,
        PresentatiionModules,
        StorageModule,
        PictureModule,
        UserModule,
        AuthModule,
        PrismaModule,
        TokenModule,
        AwsModule,
        MailModule,
        CleanupModule,
        ScheduleModule.forRoot()
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: CatchEverythingFilter
        }
    ],
    controllers: [UserController]
})
export class AppModule {}
