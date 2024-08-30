import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { UUID } from 'crypto';
import { Blog } from './entities/blog.entity';

@Controller('blog')
export class BlogController {
    private readonly blogService: BlogService;

    constructor(blogService: BlogService) {
        this.blogService = blogService;
    }

    @Get()
    async findAll(): Promise<Blog[]> {
        return await this.blogService.findAll();
    }

    @Get(':id')
    async findUnique(@Param('id') id: UUID): Promise<Blog> {
        const blog = await this.blogService.findUnique(id)

        if (!blog) {
            throw new NotFoundException(`Blog with id '${id}' was not found`)
        }

        return blog
    }
}
