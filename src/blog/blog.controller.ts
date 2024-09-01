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
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { ApiParam, ApiTags } from '@nestjs/swagger'

@Controller('blogs')
@ApiTags('Blogs')
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
    @ApiParam({ name: 'id', example: '1d5ec66c-3a99-4647-8b8d-951544a5471e' })
    async findUnique(@Param('id') id: string): Promise<Blog> {
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
    @ApiParam({ name: 'id', example: '1d5ec66c-3a99-4647-8b8d-951544a5471e' })
    async delete(@Param('id') id: string): Promise<void> {
        await this.blogService.delete(id)
    }

    @Put(':id')
    @ApiParam({ name: 'id', example: '1d5ec66c-3a99-4647-8b8d-951544a5471e' })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateBlogDto,
    ): Promise<Blog> {
        return await this.blogService.update(id, body)
    }
}
