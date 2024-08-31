import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { BlogService } from './blog.service'
import { UUID } from 'crypto'
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'

@Controller('blog')
export class BlogController {
    private readonly blogService: BlogService

    constructor(blogService: BlogService) {
        this.blogService = blogService
    }

    @Get()
    async findAll(): Promise<Blog[]> {
        return await this.blogService.findAll()
    }

    @Get(':id')
    async findUnique(@Param('id') id: UUID): Promise<Blog> {
        const blog = await this.blogService.findUnique(id)

        if (!blog) {
            throw new NotFoundException(`Blog with id '${id}' was not found`)
        }

        return blog
    }

    @Post()
    async create(@Body() body: CreateBlogDto) {
        return await this.blogService.create(body)
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<void> {
        await this.blogService.delete(id)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateBlogDto,
    ): Promise<Blog> {
        return await this.blogService.update(id, body)
    }
}
