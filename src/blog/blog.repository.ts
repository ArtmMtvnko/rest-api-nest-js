import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { BlogExtended } from './entities/blog-extended.entity'

@Injectable()
export class BlogRepository {
    private readonly prisma: PrismaService

    constructor(prisma: PrismaService) {
        this.prisma = prisma
    }

    async findAll(): Promise<Blog[]> {
        return await this.prisma.blog.findMany()
    }

    async findUnique(id: string): Promise<BlogExtended | null> {
        return await this.prisma.blog.findUnique({ 
            where: { id },
            include: { author: true }
        })
        
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        return await this.prisma.blog.create({ data: createBlogDto })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.blog.delete({ where: { id } })
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        return await this.prisma.blog.update({
            where: { id },
            data: updateBlogDto,
        })
    }
}
