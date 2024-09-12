import { Module } from '@nestjs/common'
import { LoginService } from './login.service'
import { LoginController } from './login.controller'
import { BcryptService } from 'src/services/bcrypt.service'
import { PrismaService } from 'src/prisma.service'

@Module({
    controllers: [LoginController],
    providers: [LoginService, PrismaService, BcryptService],
})
export class LoginModule {}
