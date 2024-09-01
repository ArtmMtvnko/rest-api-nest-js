import { Module } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogController } from './blog.controller'
import { PrismaService } from 'src/prisma.service'
import { BlogRepository } from './blog.repository'

@Module({
    controllers: [BlogController],
    providers: [BlogService, PrismaService, BlogRepository],
})
export class BlogModule {}
