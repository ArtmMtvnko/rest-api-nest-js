import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'src/prisma.service'
import { UserRepository } from './user.repository'
import { BcryptService } from 'src/services/bcrypt.service'

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, UserRepository, BcryptService],
})
export class UserModule {}
