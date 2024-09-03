import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { BlogService } from './blog.service'
import { BlogController } from './blog.controller'
import { PrismaService } from 'src/prisma.service'
import { BlogRepository } from './blog.repository'

@Module({
    imports: [CacheModule.register()],
    controllers: [BlogController],
    providers: [BlogService, PrismaService, BlogRepository],
})
export class BlogModule {}
