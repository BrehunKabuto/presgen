import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PrismaService } from "prisma/prisma.service";


@Injectable()
export class CleanupService{

    constructor(
        private readonly prisma: PrismaService 
    ){}

    @Cron('0 0 * * *')
    async cleanupExpired() {
        const now =new Date()

        await this.prisma.verificationCode.deleteMany({
            where: {
                expiresAt: {lt: now}
            }
        })

        await this.prisma.refreshToken.deleteMany({
            where: {
                revokeAt: {lt: now}
            }
        })
    }
}